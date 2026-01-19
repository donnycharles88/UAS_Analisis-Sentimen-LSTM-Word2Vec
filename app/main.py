from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from .model_loader import SentimentModel
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path

app = FastAPI(
    title="Roblox Sentiment Analysis API",
    description="API untuk analisis sentimen ulasan Roblox (Positif/Negatif)",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model sekali saja saat startup
sentiment_model = SentimentModel()

# Mount static files (frontend)
BASE_DIR = Path(__file__).resolve().parent.parent
app.mount("/static", StaticFiles(directory=str(BASE_DIR / "frontend")), name="static")

class TextInput(BaseModel):
    text: str

@app.get("/")
async def root():
    """Serve the frontend HTML page"""
    html_path = BASE_DIR / "frontend" / "index.html"
    return FileResponse(html_path)

@app.get("/api/info")
async def api_info():
    """API information endpoint"""
    return {
        "message": "Roblox Sentiment Analysis API is running!",
        "docs": "/docs",
        "version": "1.0.0"
    }

@app.post("/predict", response_model=dict)
async def predict_sentiment(input: TextInput):
    if not input.text or len(input.text.strip()) < 5:
        raise HTTPException(status_code=400, detail="Text terlalu pendek atau kosong")
    
    result = sentiment_model.predict(input.text)
    return result

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": True}