import pickle
import os

def save_model(model, path: str):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as f:
        pickle.dump(model, f)

def load_model(path: str):
    if not os.path.exists(path):
        return None
    with open(path, 'rb') as f:
        return pickle.load(f)
