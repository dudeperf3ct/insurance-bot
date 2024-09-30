"""Chat endpoint."""

from fastapi import APIRouter
from fastapi.exception_handlers import HTTPException
import logging
from app.core.config import settings
from app.services.llm_agents import LLMChatAgent
from app.core.schema import LLMResponse

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/chat/{task_id}", response_model=LLMResponse)
def chat_with_doc(task_id: str, query: str) -> LLMResponse:
    """Chat with the document."""
    try:
        file_location = f"/{settings.UPLOAD_DIR}/{task_id}.pdf"
        llm_agents = LLMChatAgent(pdf_file=file_location)
        response = llm_agents.chat_with_doc(query)
        return response
    except Exception as e:
        logger.error(f"Error chatting with the document: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
