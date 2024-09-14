from fastapi import FastAPI
from app.api.main import api_router
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}


app.include_router(api_router)