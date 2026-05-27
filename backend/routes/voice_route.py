import requests
import os 
from dotenv import load_dotenv
from fastapi import APIRouter, File, UploadFile

load_dotenv()

router = APIRouter()

HF_API_KEY = os.getenv("HF_API_KEY")
header = {"Authorization":f"Bearer {os.getenv('HF_TOKEN')}"}

@router.post("/voice")
async def voice_api(file : UploadFile = File(...)):
    audio_bytes = await file.read()

    response = requests.post(HF_API_KEY, headers=header, data=audio_bytes)

    text = response.json()["text"]

    return {
        "text":text
    }