import requests
import json

URL = "http://127.0.0.1:8000/scan/email"
API_KEY = "phishguard-secret-key"

SAMPLE_EMAIL = """
From: security@paypal-support.com
To: user@example.com
Subject: URGENT: Your account has been suspended!
Return-Path: hacker@evil-server.net

Dear User,

Your account has been suspended due to unauthorized access.
Please verify your account immediately to restore access.

Click here: http://paypal-verify-login.com.evil.net/login

Failure to take immediate action will result in permanent closure.

Sincerely,
PayPal Security
"""

def test_email():
    print("Testing Email Scan...")
    
    headers = {"X-API-Key": API_KEY}
    payload = {"raw_content": SAMPLE_EMAIL}
    
    try:
        res = requests.post(URL, json=payload, headers=headers)
        print(f"Status: {res.status_code}")
        
        if res.status_code == 200:
            data = res.json()
            print("Response:", json.dumps(data, indent=2))
            
            # Assertions
            if data["spoofing_detected"] == True:
                print("SUCCESS: Spoofing detected.")
            else:
                print("FAILURE: Spoofing NOT detected.")
                
            if "urgently" in str(data["keywords_found"]) or "immediate action" in str(data["keywords_found"]):
                 print("SUCCESS: Keywords found.")
                 
            if data["verdict"] in ["PHISHING", "SUSPICIOUS"]:
                print("SUCCESS: Verdict is correct.")
        else:
            print("FAILURE: Endpoint error", res.text)
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_email()
