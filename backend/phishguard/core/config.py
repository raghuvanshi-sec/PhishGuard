import os
import sys
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    APP_NAME: str = "PhishGuard"
    VERSION: str = "0.1.0"
    DEBUG: bool = False
    
    # Model Paths
    MODEL_PATH: str = "models/phishing_model.pkl"
    
    # Thresholds
    PHISHING_THRESHOLD: float = 0.8
    SUSPICIOUS_THRESHOLD: float = 0.5
    
    # Database
    MONGO_URI: str = "mongodb://localhost:27017"
    MONGO_DB_NAME: str = "phishguard"
    
    # Security
    # Error if not set. Users must set PHISHGUARD_API_KEY in env.
    API_KEY: str = os.environ.get("PHISHGUARD_API_KEY")

    API_KEY_NAME: str = "X-API-Key"
    
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

try:
    settings = Settings()
    if not settings.API_KEY:
        raise ValueError("PHISHGUARD_API_KEY environment variable is not set.")
except Exception as e:
    print(f"Configuration Error: {e}")
    sys.exit(1)

