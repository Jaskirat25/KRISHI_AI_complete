import logging
from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import httpx
import asyncio

router = APIRouter()

ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"]

# Configure logger – this route now includes retry logic.
logging.basicConfig(level=logging.INFO)

# Base URL of the Hugging Face Space (can be overridden via env var).
HF_SPACE_URL = os.getenv("HF_SPACE_URL", "https://jaskirat25-krishi-ai.hf.space")
# Optional token for higher rate limits (set HF_SPACE_TOKEN env var if you have one).
HF_SPACE_TOKEN = os.getenv("HF_SPACE_TOKEN")

# Number of retry attempts for transient errors (e.g., 429 rate‑limit).
MAX_RETRIES = int(os.getenv("HF_SPACE_MAX_RETRIES", "3"))
# Base back‑off seconds.
BASE_BACKOFF = float(os.getenv("HF_SPACE_BACKOFF", "1"))

@router.post("/image")
async def upload_image(file: UploadFile = File(...)):
    """Forward the uploaded image to the Hugging Face Space using Gradio API.

    The endpoint now implements a simple exponential back‑off retry strategy for
    HTTP 429 (rate‑limit) responses. If a token is provided via ``HF_SPACE_TOKEN``
    it is sent as a ``Authorization: Bearer <token>`` header.
    """
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    content = await file.read()
    import base64
    b64_image = base64.b64encode(content).decode('utf-8')
    payload = {"data": [f"data:{file.content_type};base64,{b64_image}"]}

    headers = {"Content-Type": "application/json"}
    if HF_SPACE_TOKEN:
        headers["Authorization"] = f"Bearer {HF_SPACE_TOKEN}"

    attempt = 0
    while attempt < MAX_RETRIES:
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f"{HF_SPACE_URL}/run/predict",
                    json=payload,
                    headers=headers,
                    timeout=30.0,
                )
            except httpx.RequestError as exc:
                logging.error(f"Error contacting HF Space: {exc}")
                raise HTTPException(status_code=502, detail="Failed to contact model service")
            if response.status_code == 200:
                return response.json()
            if response.status_code == 429:
                attempt += 1
                backoff = BASE_BACKOFF * (2 ** (attempt - 1))
                logging.warning(
                    f"HF Space rate‑limited (429). Retry {attempt}/{MAX_RETRIES} after {backoff}s"
                )
                await asyncio.sleep(backoff)
                continue
            logging.error(
                f"HF Space returned {response.status_code}: {response.text[:200]}..."
            )
            raise HTTPException(
                status_code=502,
                detail="Model service returned an error",
            )
    raise HTTPException(
        status_code=502,
        detail="Model service rate‑limited after multiple attempts",
    )


