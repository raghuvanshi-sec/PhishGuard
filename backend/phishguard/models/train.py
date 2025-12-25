import pandas as pd
import numpy as np
from phishguard.extractors.url_extractor import URLExtractor
from phishguard.models.xgb_model import PhishXGB
from phishguard.models.model_loader import save_model

def extract_dataset_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Expects DataFrame with 'url' column.
    Extracts features for each URL.
    """
    feature_list = []
    print(f"Extracting features for {len(df)} items...")
    
    for _, row in df.iterrows():
        url = row.get('url', '')
        if url:
            extractor = URLExtractor(url)
            feats = extractor.extract_features()
            feature_list.append(feats)
        else:
            # Handle empty or missing URL
            feature_list.append({})
            
    return pd.DataFrame(feature_list)

def train_model(data_path: str, model_save_path: str):
    print(f"Loading data from {data_path}...")
    
    # Check file extension to support CSV or JSON
    if data_path.endswith('.json'):
        df = pd.read_json(data_path)
    else:
        df = pd.read_csv(data_path)
    
    # Validation
    if 'url' not in df.columns or 'label' not in df.columns:
        raise ValueError("Dataset must contain 'url' and 'label' columns")
    
    # Feature Extraction
    print("Starting feature extraction...")
    X_features = extract_dataset_features(df)
    
    # Fill NAs if any (robustness)
    X_features = X_features.fillna(0)
    
    y = df['label'].map({'phishing': 1, 'legitimate': 0})
    if y.isnull().any():
        # Fallback if labels are already 0/1 or different format
        y = df['label']
    
    print(f"Training XGBoost model on {X_features.shape[0]} samples with {X_features.shape[1]} features...")
    model = PhishXGB()
    model.fit(X_features, y)
    
    print(f"Saving model to {model_save_path}...")
    save_model(model, model_save_path)
    print("Training complete.")

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 3:
        print("Usage: python -m phishguard.models.train <data_path> <model_save_path>")
        sys.exit(1)
    train_model(sys.argv[1], sys.argv[2])
