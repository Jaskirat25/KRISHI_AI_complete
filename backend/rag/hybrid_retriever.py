from retriever import retrieve_chunks # type: ignore

from bm25_retriever import bm25_search

# =========================================
# HYBRID RETRIEVAL
# =========================================

def hybrid_search(query):

    # =====================================
    # VECTOR SEARCH
    # =====================================

    vector_results = retrieve_chunks(
        query,
        top_k=3
    )

    # =====================================
    # BM25 SEARCH
    # =====================================

    bm25_results = bm25_search(
        query,
        top_k=3
    )

    # =====================================
    # COMBINE RESULTS
    # =====================================

    combined_results = []

    combined_results.extend(vector_results)

    combined_results.extend(bm25_results)

    return combined_results