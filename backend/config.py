import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import List, Optional
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

def _get_bool(name: str, default: bool = False) -> bool:
    return os.getenv(name, str(default)).lower() in {"1", "true", "yes", "on"}

def _get_origins() -> list[str]:
    origins = os.getenv("ALLOWED_ORIGINS", "*")
    return [origin.strip() for origin in origins.split(",") if origin.strip()]

@dataclass(frozen=True)
class Settings:
    GROQ_API_KEY: str | None = os.getenv("GROQ_API_KEY")
    OPENAI_API_KEY: str | None = os.getenv("OPENAI_API_KEY")
    PINECONE_API_KEY: str | None = os.getenv("PINECONE_API_KEY")
    ELEVENLABS_API_KEY: str | None = os.getenv("ELEVENLABS_API_KEY")
    GEMINI_API_KEY: str | None = os.getenv("GEMINI_API_KEY")
    HF_API_KEY: str | None = os.getenv("HF_API_KEY")
    HF_TOKEN: str | None = os.getenv("HF_TOKEN")

    ALLOWED_ORIGINS: Optional[list[str]] = None
    MODEL_DIR: str = os.getenv("MODEL_DIR", "models")
    DEBUG: bool = _get_bool("DEBUG")
    LOG_FORMAT: str = os.getenv("LOG_FORMAT", "plain")
    PORT: int = int(os.getenv("PORT", "8000"))

    def __post_init__(self) -> None:
        if self.ALLOWED_ORIGINS is None:
            object.__setattr__(self, "ALLOWED_ORIGINS", _get_origins())

settings = Settings()

def get_model_path() -> Path:
    model_dir = Path(settings.MODEL_DIR).expanduser()
    if not model_dir.is_absolute():
        model_dir = BASE_DIR / model_dir
    return model_dir.resolve()
