# Roblox Sentiment Analyzer
## Analisis Sentimen Review Game Roblox Menggunakan LSTM + Word2Vec

Aplikasi web untuk menganalisis sentimen review game Roblox menggunakan model deep learning LSTM dengan Word2Vec embeddings.

![Roblox Sentiment Analyzer](https://img.shields.io/badge/Status-Active-success)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.15+-orange)

---

## 🎯 Features

- ✅ **Real-time Sentiment Analysis**: Deteksi sentimen POSITIVE/NEGATIVE dengan confidence score
- ✅ **Modern UI/UX**: Glassmorphism design dengan smooth animations
- ✅ **High Accuracy**: Model LSTM dengan Word2Vec embeddings
- ✅ **FastAPI Backend**: RESTful API dengan dokumentasi otomatis
- ✅ **Preprocessing Pipeline**: Text cleaning, tokenization, dan sequence padding

---

## 🏗️ Architecture

```
UAS_ML/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── model_loader.py      # Model loading & inference
│   └── preprocessor.py      # Text preprocessing
├── frontend/
│   ├── index.html           # Main UI
│   ├── style.css            # Glassmorphism styling
│   └── script.js            # Frontend logic
├── model_lstm_roblox_w2v.keras    # Trained LSTM model
├── tokenizer_roblox.pickle        # Fitted tokenizer
└── requirements.txt
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- pip

### Installation

1. **Clone repository:**
   ```bash
   git clone https://github.com/donnycharles88/UAS_Analisis-Sentimen-LSTM-Word2Vec.git
   cd UAS_Analisis-Sentimen-LSTM-Word2Vec
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # Linux/Mac
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Download model files:**
   > **Note:** Model files (`.keras` and `.pickle`) are not included in git due to size.
   > You need to train the model or download pre-trained files separately.

5. **Run the application:**
   ```bash
   uvicorn app.main:app --reload --port 8001
   ```

6. **Access the web interface:**
   ```
   http://127.0.0.1:8001
   ```

---

## 📊 Model Performance

- **Architecture**: LSTM with Word2Vec embeddings
- **Positive Detection**: ~99% confidence
- **Negative Detection**: ~91% confidence
- **Preprocessing**: Lowercasing, punctuation removal, stopwords retention

---

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern web framework
- **TensorFlow/Keras**: Deep learning model
- **NLTK**: Text preprocessing
- **Uvicorn**: ASGI server

### Frontend
- **Vanilla JavaScript**: No framework dependencies
- **CSS3**: Glassmorphism design
- **HTML5**: Semantic markup

---

## 📖 API Documentation

### `POST /predict`

**Request:**
```json
{
  "text": "This game is amazing!"
}
```

**Response:**
```json
{
  "text": "This game is amazing!",
  "sentiment": "positive",
  "confidence": 0.9943,
  "positive_probability": 0.9943
}
```

### `GET /health`

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

Interactive API docs available at: `http://127.0.0.1:8001/docs`

---

## 🎨 UI Preview

The application features a modern glassmorphism design with:
- Gradient backgrounds
- Smooth animations
- Responsive layout
- Real-time sentiment visualization
- Confidence score progress bars

---

## 📝 Usage

1. **Enter Review**: Type or paste a Roblox game review
2. **Quick Examples**: Click "Ulasan Positif" or "Ulasan Negatif" for pre-filled examples
3. **Analyze**: Click "Analisis Sentimen" button
4. **View Results**: See sentiment classification with confidence score
5. **Reset**: Click "Analisis Lagi" to analyze another review

---

## 🔧 Development

### Project Structure

- `app/main.py`: FastAPI routes and static file serving
- `app/model_loader.py`: LSTM model loading and prediction logic
- `app/preprocessor.py`: Text preprocessing pipeline
- `frontend/`: Web interface (HTML/CSS/JS)

### Training Your Own Model

The model training code is not included in this repository. You'll need:
1. Roblox review dataset (positive/negative labels)
2. Word2Vec embeddings training
3. LSTM architecture training
4. Tokenizer fitting and saving

---

## 📄 License

This project is created for educational purposes (UAS - Machine Learning).

---

## 👨‍💻 Author

**Donny Charles**
- GitHub: [@donnycharles88](https://github.com/donnycharles88)
- Repository: [UAS_Analisis-Sentimen-LSTM-Word2Vec](https://github.com/donnycharles88/UAS_Analisis-Sentimen-LSTM-Word2Vec)

---

## 🙏 Acknowledgments

- Dataset: Roblox game reviews
- Framework: FastAPI, TensorFlow
- UI Inspiration: Modern glassmorphism design trends
