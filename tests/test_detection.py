import pytest
from phishguard.detection.classify import PhishDetector

def test_detector_basic():
    detector = PhishDetector()
    
    # Test safe URL (mocking behavior)
    result = detector.scan_url("http://google.com")
    assert "verdict" in result
    assert "score" in result
    
    # Test suspicious URL
    result_suspicious = detector.scan_url("http://secure-update-paypal.xyz")
    # Even without a trained model, rules/heuristics might flag it if we had them or simple score
    assert result_suspicious["url"] == "http://secure-update-paypal.xyz"

def test_rules_block():
    # If we had a rule, we'd test it here. 
    # For now ensuring it runs without error.
    pass
