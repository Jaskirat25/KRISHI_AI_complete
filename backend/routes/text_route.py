from fastapi import APIRouter
from models.text_model import TextRequest
router = APIRouter()

@router.post("/text")
async def text_chat(data:TextRequest):

    if not data.text.strip():
        return {
            "error":"Empty text"
        }
    
    return {
        "response":f"you said :{data.text}"
    }