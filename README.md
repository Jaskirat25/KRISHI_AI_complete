# KrishiAI 🌾

AI-powered crop disease detection and advisory system for farmers.

## Stack
- Frontend: React (CRA) → deployed on Vercel
- Backend: FastAPI + Uvicorn → deployed on Render
- AI: MobileNetV2 (disease detection) + RAG (Pinecone + BM25) + Groq LLM

## Local Setup

### Backend
cd backend
cp .env.example .env
# Fill in your API keys in .env
# Place plant_disease_model.h5 and label_encoder.pkl in backend/models
pip install -r requirements.txt
uvicorn server:app --reload

### Frontend
cd frontend
cp .env.example .env.local
# Set REACT_APP_API_URL=http://localhost:8000/api
npm install
npm start

## Deployment
- Frontend: Connect GitHub repo to Vercel, set root to /frontend
- Backend: Connect GitHub repo to Render, set root to /backend
