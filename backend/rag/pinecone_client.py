import os
import time

from dotenv import load_dotenv

load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")
PINECONE_CLOUD = os.getenv("PINECONE_CLOUD", "aws")
PINECONE_REGION = os.getenv("PINECONE_REGION", "us-east-1")

_index = None


def get_index():
    """
    Returns a Pinecone Index object, or None if Pinecone is not configured
    or the SDK is unavailable/broken. Callers must handle None gracefully.
    """
    global _index

    if _index is not None:
        return _index

    if not PINECONE_API_KEY:
        return None

    if not INDEX_NAME:
        print("[Pinecone] PINECONE_INDEX_NAME not set — skipping vector search.")
        return None

    try:
        from pinecone import Pinecone, ServerlessSpec  # v3+ SDK
        pc = Pinecone(api_key=PINECONE_API_KEY)
        existing_names = [idx.name for idx in pc.list_indexes()]
        if INDEX_NAME not in existing_names:
            pc.create_index(
                name=INDEX_NAME,
                dimension=768,
                metric="cosine",
                spec=ServerlessSpec(cloud=PINECONE_CLOUD, region=PINECONE_REGION),
            )
            while not pc.describe_index(INDEX_NAME).status["ready"]:
                time.sleep(1)
        _index = pc.Index(INDEX_NAME)
        print(f"[Pinecone] Connected to index: {INDEX_NAME}")
        return _index
    except Exception as e:
        print(f"[Pinecone] Could not initialise — falling back to BM25 only. Reason: {e}")
        return None
