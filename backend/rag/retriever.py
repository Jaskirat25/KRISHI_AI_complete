from sentence_transformers import SentenceTransformer
from rag.pinecone_client import index
import os

# =========================================
# GLOBAL MODEL VARIABLE
# =========================================

embedding_model = None

# =========================================
# LOAD MODEL ONLY WHEN NEEDED
# =========================================

def get_embedding_model():

    global embedding_model

    # =====================================
    # RETURN IF ALREADY LOADED
    # =====================================

    if embedding_model is not None:
        return embedding_model

    # =====================================
    # CHECK ENV VARIABLE
    # =====================================

    ENABLE_LOCAL_EMBEDDINGS = os.getenv(
        "ENABLE_LOCAL_EMBEDDINGS",
        "true"
    ).lower() == "true"

    if not ENABLE_LOCAL_EMBEDDINGS:
        raise Exception(
            "Local embeddings are disabled."
        )

    # =====================================
    # LOAD MODEL
    # =====================================

    embedding_model = SentenceTransformer(
        "sentence-transformers/all-MiniLM-L6-v2"
    )

    return embedding_model


# =========================================
# VECTOR RETRIEVAL
# =========================================

def retrieve_chunks(query, top_k=3):

    # =====================================
    # LOAD MODEL ONLY WHEN REQUIRED
    # =====================================

    model = get_embedding_model()

    # =====================================
    # EMBED USER QUERY
    # =====================================

    query_embedding = model.encode(
        query,
        normalize_embeddings=True
    ).tolist()

    # =====================================
    # SEARCH PINECONE
    # =====================================

    results = index.query(

        vector=query_embedding,

        top_k=top_k,

        include_metadata=True
    )

    # =====================================
    # FORMAT RESULTS
    # =====================================

    retrieved_chunks = []

    for match in results["matches"]:

        retrieved_chunks.append({

            "score": match["score"],

            "disease": match["metadata"]["disease"],

            "section": match["metadata"]["section"],

            "content": match["metadata"]["content"],

            "page_number": match["metadata"]["page_number"]
        })

    return retrieved_chunks