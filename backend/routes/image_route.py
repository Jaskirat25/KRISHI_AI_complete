import os
import logging
from fastapi import APIRouter, UploadFile, File, HTTPException
import httpx
import numpy as np
from ..utils import preprocess_image

router = APIRouter()

ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"]

# Configure logger
logging.basicConfig(level=logging.INFO)

# Hugging Face Space URL – can be overridden via environment variable
HF_SPACE_URL = os.getenv("HF_SPACE_URL", "https://jaskirat25-krishi-ai.hf.space")

@router.post("/image")
async def upload_image(file: UploadFile = File(...)):
    """Proxy the uploaded image to the Hugging Face Space and return its prediction.

    The Space at `HF_SPACE_URL` already hosts the same model. We forward the image
    as multipart/form‑data and simply return the JSON response we receive.
    """
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    # Read the uploaded file into memory
    content = await file.read()

    # Prepare multipart request for the external Space
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{HF_SPACE_URL}/api/image",
                files={"file": (file.filename, content, file.content_type)},
                timeout=30.0,
            )
        except httpx.RequestError as exc:
            logging.error(f"Error contacting HF Space: {exc}")
            raise HTTPException(status_code=502, detail="Failed to contact model service")

    if response.status_code != 200:
        logging.error(
            f"HF Space returned {response.status_code}: {response.text}" 
        )
        raise HTTPException(
            status_code=502, detail="Model service returned an error"
        )

    # Forward the JSON payload from the Space directly to the client
    return response.json()

