// API Configuration
// Empty string means use same origin (since frontend is served by FastAPI)
const API_BASE_URL = '';

// DOM Elements
const sentimentForm = document.getElementById('sentimentForm');
const reviewText = document.getElementById('reviewText');
const charCounter = document.getElementById('charCounter');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsSection = document.getElementById('resultsSection');
const loadingState = document.getElementById('loadingState');
const resultDisplay = document.getElementById('resultDisplay');
const errorDisplay = document.getElementById('errorDisplay');
const exampleChips = document.querySelectorAll('.chip');
const analyzeAgainBtn = document.getElementById('analyzeAgainBtn');
const retryBtn = document.getElementById('retryBtn');

// Character Counter
reviewText.addEventListener('input', () => {
    const length = reviewText.value.length;
    charCounter.textContent = `${length} karakter`;

    // Visual feedback for minimum length
    if (length > 0 && length < 5) {
        charCounter.style.color = 'var(--negative-color)';
    } else if (length >= 5) {
        charCounter.style.color = 'var(--positive-color)';
    } else {
        charCounter.style.color = 'var(--text-muted)';
    }
});

// Example Chips Click Handlers
exampleChips.forEach(chip => {
    chip.addEventListener('click', () => {
        const exampleText = chip.getAttribute('data-text');
        reviewText.value = exampleText;
        reviewText.dispatchEvent(new Event('input'));

        // Smooth scroll to textarea
        reviewText.scrollIntoView({ behavior: 'smooth', block: 'center' });
        reviewText.focus();

        // Add pulse animation
        chip.style.animation = 'none';
        setTimeout(() => {
            chip.style.animation = '';
        }, 10);
    });
});

// Form Submit Handler
sentimentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const text = reviewText.value.trim();

    // Validation
    if (!text) {
        showError('Harap masukkan teks ulasan terlebih dahulu.');
        return;
    }

    if (text.length < 5) {
        showError('Teks terlalu pendek. Minimal 5 karakter.');
        return;
    }

    // Show loading state
    showLoading();

    try {
        // Call API
        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });

        if (!response.ok) {
            if (response.status === 400) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Teks tidak valid');
            }
            throw new Error('Gagal menganalisis sentimen. Silakan coba lagi.');
        }

        const result = await response.json();

        // Show results with slight delay for better UX
        setTimeout(() => {
            showResults(result, text);
        }, 500);

    } catch (error) {
        console.error('Error:', error);
        setTimeout(() => {
            showError(error.message || 'Terjadi kesalahan saat menghubungi server. Pastikan backend sedang berjalan.');
        }, 500);
    }
});

// Show Loading State
function showLoading() {
    resultsSection.style.display = 'block';
    loadingState.style.display = 'block';
    resultDisplay.style.display = 'none';
    errorDisplay.style.display = 'none';

    // Disable form
    analyzeBtn.disabled = true;
    reviewText.disabled = true;

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Show Results
function showResults(result, originalText) {
    const sentiment = result.sentiment.toLowerCase();
    const confidence = result.confidence;
    const confidencePercent = (confidence * 100).toFixed(1);

    // Update sentiment badge
    const sentimentBadge = document.getElementById('sentimentBadge');
    const sentimentIcon = document.getElementById('sentimentIcon');
    const sentimentLabel = document.getElementById('sentimentLabel');

    sentimentBadge.className = 'sentiment-badge ' + sentiment;

    if (sentiment === 'positive') {
        sentimentIcon.textContent = '😊';
        sentimentLabel.textContent = 'Positive';
    } else {
        sentimentIcon.textContent = '😞';
        sentimentLabel.textContent = 'Negative';
    }

    // Update confidence
    const confidenceValue = document.getElementById('confidenceValue');
    const confidenceFill = document.getElementById('confidenceFill');

    confidenceValue.textContent = `${confidencePercent}%`;
    confidenceFill.className = 'confidence-fill ' + sentiment;
    confidenceFill.style.width = `${confidencePercent}%`;

    // Update analyzed text
    const analyzedTextContent = document.getElementById('analyzedTextContent');
    analyzedTextContent.textContent = originalText;

    // Show result display
    loadingState.style.display = 'none';
    resultDisplay.style.display = 'block';

    // Re-enable form
    analyzeBtn.disabled = false;
    reviewText.disabled = false;
}

// Show Error
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;

    loadingState.style.display = 'none';
    resultDisplay.style.display = 'none';
    errorDisplay.style.display = 'block';

    // Re-enable form
    analyzeBtn.disabled = false;
    reviewText.disabled = false;

    // Show results section if not already visible
    resultsSection.style.display = 'block';
}

// Analyze Again Button
analyzeAgainBtn.addEventListener('click', () => {
    resultsSection.style.display = 'none';
    reviewText.value = '';
    reviewText.dispatchEvent(new Event('input'));
    reviewText.focus();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Retry Button
retryBtn.addEventListener('click', () => {
    errorDisplay.style.display = 'none';
    resultsSection.style.display = 'none';
    reviewText.focus();
});

// Check API Health on Load
window.addEventListener('load', async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (response.ok) {
            console.log('✅ Backend API is running');
        }
    } catch (error) {
        console.warn('⚠️ Backend API might not be running. Please start it with: uvicorn app.main:app --reload --port 8001');
    }
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Prevent form submission on Enter in textarea (allow Shift+Enter for new line)
reviewText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sentimentForm.dispatchEvent(new Event('submit'));
    }
});
