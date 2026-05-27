from sentence_transformers import SentenceTransformer # type: ignore
from rag.chunker import semantic_chunks

# =========================================
# LOAD EMBEDDING MODEL
# =========================================

embedding_model = SentenceTransformer(
    "sentence-transformers/all-MiniLM-L6-v2"
)

# =========================================
# BUILD TEXTS FOR EMBEDDING
# No leading whitespace — each space is a
# real token fed to the model
# =========================================

texts = [
    f"Disease: {chunk['disease']}\nSection: {chunk['section']}\nContent: {chunk['content']}"
    for chunk in semantic_chunks
]

# =========================================
# BATCH ENCODE  —  all chunks in one call
# normalize_embeddings=True → unit-length
# vectors, so cosine similarity = dot product
# (faster retrieval, no extra step needed)
# =========================================

embeddings = embedding_model.encode(
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