from setuptools import setup, find_packages

setup(
    name="phishguard",
    version="0.1.0",
    description="Advanced Phishing Detection Engine",
    author="PhishGuard Team",
    packages=find_packages(),
    install_requires=[
        "pandas",
        "numpy",
        "scikit-learn",
        "xgboost",
        "tldextract",
        "beautifulsoup4",
        "requests",
        "nltk",
        "fastapi",
        "uvicorn"
    ],
    python_requires=">=3.8",
)
