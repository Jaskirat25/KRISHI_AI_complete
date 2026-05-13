from fastapi import APIRouter, UploadFile, File

router = APIRouter()

ALLOWED_AUDIO_TYPES = ["audio/mpeg", "audio/wav","audio/ogg","audip/webm"]

@router.post("/voice")
async def upload_audio(file:UploadFile = File(...)):
    if file.content_type not in ALLOWED_AUDIO_TYPES:
        return {
            "error":"Invalid file type"
        }
    
    return {
        "reposne":f"received file : {file.filename}, {file.content_type}"
    }