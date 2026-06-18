from fastapi import APIRouter, UploadFile, File
from ..utils import preprocess_image
import numpy as np
import logging

router = APIRouter()

ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"]

# Configure logger
logging.basicConfig(level=logging.INFO)

# Load model and encoder once
from ..disease_model.model_louder import model, le

@router.post("/image")
async def upload_image(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        return {"error": "Unsupported file type"}
    content = await file.read()
    img = preprocess_image(content)
    preds = model.predict(img)[0]
    idx = np.argmax(preds)
    label = le.inverse_transform([idx])[0]
    logging.info(f"Predictions: {preds}, idx: {idx}, label: {label}")
    return {"prediction": label, "confidence": float(np.max(preds))}
