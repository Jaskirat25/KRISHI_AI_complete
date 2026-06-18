_bm25 = None
_semantic_chunks = None


def _get_bm25_index():
    global _bm25, _semantic_chunks

    if _bm25 is not None and _semantic_chunks is not None:
        return _bm25, _semantic_chunks

    from rank_bm25 import BM25Okapi
    from rag.chunker import semantic_chunks

    documents = []
    for chunk in semantic_chunks:
        text = f"""
        Disease: {chunk['disease']}
        Section: {chunk['section']}
        Content: {chunk['content']}
        """
        documents.append(text)

    tokenized_docs = [doc.lower().split() for doc in documents]
    _bm25 = BM25Okapi(tokenized_docs)
    _semantic_chunks = semantic_chunks
    return _bm25, _semantic_chunks


def bm25_search(query, top_k=3):
    bm25, semantic_chunks = _get_bm25_index()
    tokenized_query = query.lower().split()
    scores = bm25.get_scores(tokenized_query)

    ranked_indices = sorted(
        range(len(scores)),
        key=lambda i: scores[i],
        reverse=True,
    )[:top_k]

    results = []
    for idx in ranked_indices:
        chunk = semantic_chunks[idx]
        results.append({
            "score": float(scores[idx]),
            "disease": chunk["disease"],
            "section": chunk["section"],
            "content": chunk["content"],
        })

    return results
