from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv

import os
import time

# =========================================
# LOAD ENV VARIABLES
# =========================================

load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")

# =========================================
# INITIALIZE PINECONE
# =========================================

pc = Pinecone(
    api_key=PINECONE_API_KEY
)

# =========================================
# GET EXISTING INDEXES
# =========================================

existing_indexes = pc.list_indexes().names()

# =========================================
# CREATE INDEX IF NOT EXISTS
# =========================================

if INDEX_NAME not in existing_indexes:

    print(f"\nCreating index: {INDEX_NAME}")

    pc.create_index(

        name=INDEX_NAME,

        dimension=384,

        metric="cosine",

        spec=ServerlessSpec(

            cloud="aws",

            region="us-east-1"
        )
    )

    # =====================================
    # WAIT UNTIL INDEX READY
    # =====================================

    while not pc.describe_index(INDEX_NAME).status["ready"]:

        time.sleep(1)

# =========================================
# CONNECT TO INDEX
# =========================================

index = pc.Index(INDEX_NAME)

print(f"\nConnected to index: {INDEX_NAME}")