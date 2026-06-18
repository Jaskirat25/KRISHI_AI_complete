import os
# Force legacy Keras 2 engine for tensorflow compatibility
os.environ["TF_USE_LEGACY_KERAS"] = "1"

import os
os.environ["TF_USE_LEGACY_KERAS"] = "1"

import uvicorn
from backend.server import app


@app.get("/")
async def root():
    return {
        "message": "Welcome to Krishi AI Backend API on Hugging Face Spaces!",
        "status": "active",
        "docs": "/docs"
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", "7860"))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
