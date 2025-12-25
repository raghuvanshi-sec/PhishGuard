from xgboost import XGBClassifier

class PhishXGB:
    def __init__(self):
        self.model = XGBClassifier(use_label_encoder=False, eval_metric='logloss')
        
    def fit(self, X, y):
        self.model.fit(X, y)
        
    def predict_proba(self, X):
        return self.model.predict_proba(X)
