from fastapi import FastAPI

from routes.text_route import router as text_router
from routes.image_route import router as image_router
from routes.voice_route import router as voice_router

app = FastAPI()

app.include_router(text_router,prefix="/api")
app.include_router(image_router,prefix="/api")
app.include_router(voice_router,prefix="/api")