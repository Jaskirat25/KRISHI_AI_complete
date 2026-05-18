

from fastapi import APIRouter

from models.text_model import TextRequest

from rag.hybrid_retriever import hybrid_search

router = APIRouter()

# =========================================
# TEXT ROUTE
# =========================================

@router.post("/text")

async def text_chat(data: TextRequest):

    # =====================================
    # EMPTY QUERY
    # =====================================

    if not data.text.strip():

        return {
            "error": "Empty text"
        }

    # =====================================
    # HYBRID SEARCH
    # =====================================

    results = hybrid_search(
        data.text
    )

    # =====================================
    # RESPONSE
    # =====================================

    return {

        "query": data.text,

        "results": results
    }