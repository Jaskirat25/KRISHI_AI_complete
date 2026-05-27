from sentence_transformers import SentenceTransformer

from rag.pinecone_client import index

# =========================================
# LOAD EMBEDDING MODEL
# =========================================

embedding_model = SentenceTransformer(
    "sentence-transformers/all-MiniLM-L6-v2"
)

# =========================================
# VECTOR RETRIEVAL
# =========================================

def retrieve_chunks(query, top_k=3):

    # =====================================
    # EMBED USER QUERY
    # =====================================

    query_embedding = embedding_model.encode(
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