import requests
import os
import pandas as pd
from io import StringIO

# URL for the dataset (shreyagopal/Phishing-Website-Detection...)
# Contains 10,000 URLs
DATASET_URL = "https://raw.githubusercontent.com/shreyagopal/Phishing-Website-Detection-by-Machine-Learning-Techniques/master/DataFiles/5.urldata.csv"
OUTPUT_PATH = "datasets/raw/phishing_10k.csv"

def download_data():
    print(f"Downloading dataset from {DATASET_URL}...")
    try:
        response = requests.get(DATASET_URL)
        response.raise_for_status()
        
        print("Download complete. Saving to file...")
        os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
        
        # Read into pandas to verify integrity (and maybe sample if too huge)
        csv_data = StringIO(response.text)
        df = pd.read_csv(csv_data)
        
        print(f"Dataset Stats: {len(df)} rows, {len(df.columns)} columns")
        print(df.head())
        
        # Save locally
        df.to_csv(OUTPUT_PATH, index=False)
        print(f"Saved to {OUTPUT_PATH}")
        
    except Exception as e:
        print(f"Error downloading dataset: {e}")

if __name__ == "__main__":
    download_data()
