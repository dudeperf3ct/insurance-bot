from fastapi import APIRouter
from app.api.routes import analyse_pdf

api_router = APIRouter()
api_router.include_router(analyse_pdf.router)
