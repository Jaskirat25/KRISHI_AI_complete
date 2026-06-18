import os
import google.generativeai as genai

# Configure Gemini API key from environment
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


def embed_text(text: str) -> list[float]:
    """Generate a 768‑dimensional embedding for *text* using Gemini.
    Returns a list of floats.
    """
    response = genai.embed_content(
        model="text-embedding-004",
        content=text,
        task_type="retrieval_document",
    )
    # The response dict contains the embedding under the key "embedding"
    return response["embedding"]