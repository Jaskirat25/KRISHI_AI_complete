import os

embedding_model = None


def get_embedding_model():
    global embedding_model

    if embedding_model is not None:
        return embedding_model

    ENABLE_LOCAL_EMBEDDINGS = os.getenv(
        "ENABLE_LOCAL_EMBEDDINGS", "false"
    ).lower() == "true"

    if not ENABLE_LOCAL_EMBEDDINGS:
        raise Exception(
            "Local embeddings are disabled on this server."
        )

    from sentence_transformers import SentenceTransformer

    embedding_model = SentenceTransformer(
        "sentence-transformers/all-MiniLM-L6-v2"
    )

    return embedding_model