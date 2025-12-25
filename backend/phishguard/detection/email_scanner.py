import re
import email
from email.policy import default
import tldextract
from phishguard.detection.classify import PhishDetector
from phishguard.detection.rules_engine import RulesEngine, PROTECTED_BRANDS

class EmailScanner:
    def __init__(self):
        self.url_detector = PhishDetector()
        self.rules_engine = RulesEngine() # Reuse RulesEngine for typosquatting checks
        # Keywords indicating urgency or pressure
        self.suspicious_keywords = [
            "urgently", "immediate action", "verify your account",
            "password expiration", "unauthorized access", "suspended",
            "cancell", "bitcoin", "fund transfer"
        ]

    def scan_email(self, raw_content: str) -> dict:
        """
        Parses and analyzes a raw email for phishing indicators.
        """
        results = {
            "verdict": "SAFE",
            "score": 0.0,
            "spoofing_detected": False,
            "typosquatting_detected": False,
            "suspicious_urls": [],
            "keywords_found": [],
            "details": {}
        }

        try:
            # 1. Parse Email
            msg = email.message_from_string(raw_content, policy=default)
            
            # 2. Extract Headers
            headers = {
                "From": msg.get("From", ""),
                "Return-Path": msg.get("Return-Path", ""),
                "Subject": msg.get("Subject", ""),
                "Authentication-Results": msg.get("Authentication-Results", ""),
                "Received-SPF": msg.get("Received-SPF", "")
            }
            results["details"]["headers"] = headers

            # 3. Check Spoofing (Basic Mismatch)
            # Simple heuristic: If extracted emails from 'From' and 'Return-Path' differ significantly
            from_email = self._extract_email(headers["From"])
            return_path = self._extract_email(headers["Return-Path"])
            
            if from_email and return_path and from_email != return_path:
                results["spoofing_detected"] = True
                results["details"]["spoofing_reason"] = f"Mismatch: From({from_email}) != Return-Path({return_path})"

            # 3.5 Check Authentication Headers (SPF/DKIM)
            auth_score_modifier = self._check_auth_headers(headers)
            
            # 3.6 Check Sender Typosquatting
            if from_email:
                sender_domain = from_email.split('@')[-1]
                # Use a dummy URL format for RulesEngine or extract logic?
                # Let's reuse RulesEngine logic by constructing a fake http url
                # or better, manually check using same logic.
                # For simplicity, we construct a URL effectively to leverage RulesEngine's existing evaluate
                typo_check = self.rules_engine.evaluate(f"http://{sender_domain}")
                if typo_check.get("blocked", False) or "Typosquatting" in str(typo_check.get("rules_triggered", [])):
                     results["typosquatting_detected"] = True
                     results["details"]["sender_typosquat"] = f"Sender domain {sender_domain} looks suspicious."


            # 4. Extract Body & Scan for Keywords
            body = self._get_email_body(msg)
            results["details"]["body_preview"] = body[:200] + "..." if len(body) > 200 else body
            
            found_keywords = [kw for kw in self.suspicious_keywords if kw.lower() in body.lower()]
            results["keywords_found"] = found_keywords

            # 5. Extract & Scan URLs
            urls = re.findall(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', body)
            
            max_url_score = 0.0
            for url in urls:
                scan_res = self.url_detector.scan_url(url)
                if scan_res["verdict"] in ["PHISHING", "SUSPICIOUS"]:
                    results["suspicious_urls"].append({
                        "url": url,
                        "verdict": scan_res["verdict"],
                        "score": scan_res["score"]
                    })
                    max_url_score = max(max_url_score, scan_res["score"])

            # 6. Final Verdict Logic
            score = 0.0
            
            # Weighted Scoring
            if results["spoofing_detected"]: score += 0.4
            if results["typosquatting_detected"]: score += 0.8 # Strong indicator
            
            score += auth_score_modifier # Add penalty/bonus from Auth headers
            
            if len(found_keywords) > 0: score += 0.2 + (len(found_keywords) * 0.05)
            
            # Content Correlation: Urgent + Suspicious Link = High Risk
            if len(found_keywords) > 0 and max_url_score > 0.5:
                score += 0.3
            
            score += max_url_score * 0.6  # URLs are strong indicators
            
            results["score"] = min(score, 1.0) # Cap at 1.0
            results["score"] = max(results["score"], 0.0) # Floor at 0.0

            if results["score"] > 0.75:
                results["verdict"] = "PHISHING"
            elif results["score"] > 0.4:
                results["verdict"] = "SUSPICIOUS"
            
        except Exception as e:
            results["error"] = str(e)
            
        return results

    def _extract_email(self, text):
        match = re.search(r'[\w.+-]+@[\w-]+\.[\w.-]+', text)
        return match.group(0) if match else None
        
    def _check_auth_headers(self, headers):
        """
        Returns a score modifier based on SPF/DKIM headers.
        Positive adds risk, Negative reduces risk.
        """
        score = 0.0
        auth_res = headers.get("Authentication-Results", "").lower()
        received_spf = headers.get("Received-SPF", "").lower()
        
        # SPF Fail
        if "spf=fail" in auth_res or "fail" in received_spf:
            score += 0.3
        # DKIM Fail
        if "dkim=fail" in auth_res:
            score += 0.3
            
        # SPF/DKIM Pass (slight trust boost, but don't overtrust)
        if "spf=pass" in auth_res or "pass" in received_spf:
             score -= 0.1
        if "dkim=pass" in auth_res:
             score -= 0.1
             
        return score

    def _get_email_body(self, msg):
        if msg.is_multipart():
            for part in msg.walk():
                ctype = part.get_content_type()
                cdispo = str(part.get('Content-Disposition'))
                
                # skip attachments
                if 'attachment' in cdispo:
                    continue
                    
                if ctype == 'text/plain':
                    return part.get_payload(decode=True).decode()
                elif ctype == 'text/html':
                    # Basic HTML stripping could go here, returning raw for now
                    return part.get_payload(decode=True).decode()
        else:
            return msg.get_payload(decode=True).decode()
        return ""
