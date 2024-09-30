"""PDF document endpoint."""

from fastapi import UploadFile, File, APIRouter, HTTPException
from fastapi.background import BackgroundTasks
import hashlib
import logging
import aiofiles
from app.core.config import settings
from app.services.llm_agents import LLMAgents
from app.core.schema import LLMAgentResponse

logger = logging.getLogger(__name__)

router = APIRouter()
llm_agents = LLMAgents()

# In Memory Storage for Task Status
task_status = {}


async def process_pdf(file_path: str, task_id: str):
    try:
        task_status[task_id] = {"status": "pending"}
        result: LLMAgentResponse = llm_agents.process_document(file_path)
        task_status[task_id] = {
            "status": "completed",
            "result": result.model_dump(mode="json"),
        }
    except Exception as e:
        task_status[task_id] = {"status": "failed", "error": str(e)}


@router.post("/analyse_doc")
async def upload_file(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    logger.info(f"Received PDF analysis request for file: {file.filename}")
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="File must be a PDF")

    task_id = hashlib.md5(file.filename.encode("utf-8")).hexdigest()
    file_location = f"/{settings.UPLOAD_DIR}/{task_id}.pdf"

    try:
        async with aiofiles.open(file_location, "wb") as out_file:
            content = await file.read()
            await out_file.write(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading file: {str(e)}")

    background_tasks.add_task(process_pdf, file_location, task_id)

    return {
        "task_id": task_id,
        "message": "PDF uploaded successfully and processing started",
    }


@router.get("/status/{task_id}")
async def get_task_status(task_id: str):
    if task_id not in task_status:
        raise HTTPException(status_code=404, detail="Task not found")
    return task_status[task_id]
