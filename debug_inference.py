import pandas as pd
from phishguard.models.model_loader import load_model
from phishguard.core.config import settings
from phishguard.extractors.url_extractor import URLExtractor

# Test with a known phishing URL from the dataset or internet
TEST_URL = "http://paypal-security-alert.com/login" 

def test_inference():
    print(f"Loading model from {settings.MODEL_PATH}...")
    model = load_model(settings.MODEL_PATH)
    
    if not model:
        print("ERROR: Model not found!")
        return

    print(f"Extracting features for: {TEST_URL}")
    extractor = URLExtractor(TEST_URL)
    features = extractor.extract_features()
    
    print("\nEXTRACTED FEATURES:")
    for k, v in features.items():
        print(f"{k}: {v}")
        
    df = pd.DataFrame([features])
    
    print("\nPREDICTION:")
    try:
        # Check raw probability
        probs = model.predict_proba(df)
        print(f"Probabilities: {probs}")
        
        phishing_prob = probs[0][1]
        print(f"Phishing Probability: {phishing_prob:.4f}")
        
        prediction = model.predict(df)[0]
        print(f"Class Prediction: {prediction}")
        
    except Exception as e:
        print(f"Error during prediction: {e}")

if __name__ == "__main__":
    test_inference()
