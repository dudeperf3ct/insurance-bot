from typing import Optional
from pydantic import BaseModel


class LLMAgentResponse(BaseModel):
    is_insurance_doc: bool
    what_is_good: Optional[str] = ""
    what_is_bad: Optional[str] = ""
    what_is_okay: Optional[str] = ""
    youtube_video_rec: Optional[str] = ""


class LLMResponse(BaseModel):
    answer: str
