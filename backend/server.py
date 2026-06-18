import os
os.environ["TF_USE_LEGACY_KERAS"] = "1"
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
import logging

from .routes.text_route import router as text_router
from .routes.image_route import router as image_router
from .routes.voice_route import router as voice_router
from config import settings

# Configure logger
logger = logging.getLogger("krishiAI")
if settings.LOG_FORMAT == "json":
    class JsonFormatter(logging.Formatter):
        def format(self, record):
            return f"{{\"level\": \"{record.levelname}\", \"message\": \"{record.getMessage()}\", \"time\": \"{self.formatTime(record)}\"}}"
    handler = logging.StreamHandler()
    handler.setFormatter(JsonFormatter())
    logger.handlers = [handler]
else:
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger("krishiAI")

# Request ID middleware
class RequestIdMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        request_id = request.headers.get("X-Request-ID", os.urandom(8).hex())
        response = await call_next(request)
        response.headers["X-Request-ID"] = request_id
        return response

# Initialize FastAPI app
app = FastAPI(
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
)

# Middleware configuration — CORS must be registered last so it is outermost
app.add_middleware(RequestIdMiddleware)
app.add_middleware(GZipMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health endpoint
@app.get("/health")
async def health():
    return {"status": "ok", "version": "1.0.0"}

# Include routers
app.include_router(text_router, prefix="/api")
app.include_router(image_router, prefix="/api")
app.include_router(voice_router, prefix="/api")

# Global exception handler to return JSON
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}")
    return JSONResponse(status_code=500, content={"detail": "Internal server error"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=settings.PORT)