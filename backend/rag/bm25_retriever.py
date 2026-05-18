from rank_bm25 import BM25Okapi

from chunker import semantic_chunks

# =========================================
# PREPARE DOCUMENTS
# =========================================

documents = []

for chunk in semantic_chunks:

    text = f"""
    Disease: {chunk['disease']}
    Section: {chunk['section']}
    Content: {chunk['content']}
    """

    documents.append(text)

# =========================================
# TOKENIZE DOCUMENTS
# =========================================

tokenized_docs = [

    doc.lower().split()

    for doc in documents
]

# =========================================
# BUILD BM25 INDEX
# =========================================

bm25 = BM25Okapi(tokenized_docs)

# =========================================
# BM25 SEARCH
# =========================================

def bm25_search(query, top_k=3):

    tokenized_query = query.lower().split()

    scores = bm25.get_scores(tokenized_query)

    ranked_indices = sorted(

        range(len(scores)),

        key=lambda i: scores[i],

        reverse=True
    )[:top_k]

    results = []

    for idx in ranked_indices:

        chunk = semantic_chunks[idx]

        results.append({

            "score": float(scores[idx]),

            "disease": chunk["disease"],

            "section": chunk["section"],

            "content": chunk["content"]
        })

    return results