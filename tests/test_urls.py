from phishguard.extractors.url_extractor import URLExtractor

def test_url_extractor():
    url = "https://www.google.com"
    extractor = URLExtractor(url)
    features = extractor.extract_features()
    assert features['has_https'] == 1
    assert features['is_ip'] == 0
