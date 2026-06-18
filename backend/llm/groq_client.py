from dotenv import load_dotenv
import os

load_dotenv()

_client = None


def get_client():
    global _client

    if _client is not None:
        return _client

    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError("GROQ_API_KEY is not configured.")

    from groq import Groq

    _client = Groq(api_key=api_key)
    return _client
