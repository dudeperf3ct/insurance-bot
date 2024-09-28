"""Main entrypoint."""

import logging
from fastapi import FastAPI
from app.api.main import api_router
from app.core.config import settings
from starlette.middleware.cors import CORSMiddleware

app = FastAPI(title=settings.PROJECT_NAME)

# Set up logging
logging.basicConfig(level=logging.INFO)


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
