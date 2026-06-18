from fastapi import FastAPI,APIRouter,UploadFile,File
from utils import preprocess_image
import numpy as np
router = APIRouter()

ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"]

@router.post("/image")
async def upload_image(file: UploadFile = File(...)):
    from disease_model.model_louder import model, le

    content = await file.read()
    img = preprocess_image(content)
    preds = model.predict(img)[0]
    idx = np.argmax(preds)
    label = le.inverse_transform([idx])[0]

    return {
        "prediction":label,
        "confidence": float(np.max(preds))
    }
