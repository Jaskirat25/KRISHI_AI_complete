from fastapi import APIRouter

from models.text_model import TextRequest

from rag.hybrid_retriever import hybrid_search

from llm.generate_response import generate_response

from language import english_to_punjabi

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

    retrieved_chunks = hybrid_search(
        data.text
    )

    # =====================================
    # GENERATE LLM RESPONSE
    # =====================================

    try:
        answer = generate_response(
            data.text,
            retrieved_chunks
        )
    except RuntimeError as e:
        return {"error": str(e)}

    # =====================================
    # RESPONSE
    # =====================================
    answer_in_punjabi = english_to_punjabi(answer)
    return {

        "query": data.text,

        "retrieved_chunks": retrieved_chunks,

        "answer": answer,

        "answer_in_punjabi": answer_in_punjabi
    }