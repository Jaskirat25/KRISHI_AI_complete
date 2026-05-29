from sentence_transformers import SentenceTransformer  # type: ignore
from rag.chunker import semantic_chunks

# =========================================

# GLOBAL MODEL VARIABLE

# =========================================

embedding_model = None

# =========================================

# LOAD MODEL ONLY WHEN NEEDED

# =========================================

def get_embedding_model():
    global embedding_model

    if embedding_model is None:
        embedding_model = SentenceTransformer(
            "sentence-transformers/all-MiniLM-L6-v2"
        )

    return embedding_model


# =========================================

# GENERATE EMBEDDINGS

# =========================================

def generate_embeddings():


    model = get_embedding_model()

    # =========================================
    # BUILD TEXTS FOR EMBEDDING
    # =========================================

    texts = [
        f"Disease: {chunk['disease']}\nSection: {chunk['section']}\nContent: {chunk['content']}"
        for chunk in semantic_chunks
    ]

    # =========================================
    # BATCH ENCODE
    # =========================================

    embeddings = model.encode(
        texts,
        batch_size=32,
        normalize_embeddings=True,
        show_progress_bar=True,
    )

    # =========================================
    # ATTACH EMBEDDINGS BACK TO CHUNKS
    # =========================================

    embedded_chunks = [
        {**chunk, "embedding": embedding.tolist()}
        for chunk, embedding in zip(semantic_chunks, embeddings)
    ]

    return embedded_chunks
    
