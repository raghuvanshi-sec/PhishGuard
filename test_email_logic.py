import sys
import os
sys.path.append(os.getcwd())
from phishguard.detection.email_scanner import EmailScanner

SAMPLE_EMAIL = """
From: security@paypal-support.com
To: user@example.com
Subject: URGENT: Your account has been suspended!
Return-Path: hacker@evil-server.net

Dear User,

Your account has been suspended due to unauthorized access.
Please verify your account immediately.

Click here: http://paypal-verify-login.com.evil.net/login

Failure to take immediate action will result in permanent closure.

Sincerely,
PayPal Security
"""

def test_logic():
    print("Testing EmailScanner Logic...")
    scanner = EmailScanner()
    
    result = scanner.scan_email(SAMPLE_EMAIL.strip())
    
    print("Verdict:", result["verdict"])
    print("Spoofing:", result["spoofing_detected"])
    print("Keywords:", result["keywords_found"])
    
    if result["spoofing_detected"] and len(result["keywords_found"]) > 0:
        print("SUCCESS: Logic is working.")
    else:
        print("FAILURE: Logic check failed.")

if __name__ == "__main__":
    test_logic()
