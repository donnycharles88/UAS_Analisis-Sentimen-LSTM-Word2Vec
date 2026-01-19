import tensorflow as tf
import pickle
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
from .preprocessor import preprocess_text   # ini harus ada dan benar

class SentimentModel:
    def __init__(self, 
                 model_path="model_lstm_roblox_w2v.keras", 
                 tokenizer_path="tokenizer_roblox.pickle"):
        
        print("Memuat model dan tokenizer...")
        self.model = tf.keras.models.load_model(model_path)
        
        with open(tokenizer_path, 'rb') as f:
            self.tokenizer = pickle.load(f)
        
        print("Model (.keras) & Tokenizer berhasil dimuat!")

    def predict(self, text: str):
        try:
            processed = preprocess_text(text, self.tokenizer)
            prob = float(self.model.predict(processed, verbose=0)[0][0])
            
            sentiment = "positive" if prob >= 0.5 else "negative"
            confidence = prob if sentiment == "positive" else 1 - prob
            
            return {
                "text": text,
                "sentiment": sentiment,
                "confidence": round(float(confidence), 4),
                "positive_probability": round(float(prob), 4)
            }
        except Exception as e:
            return {"error": str(e)}

