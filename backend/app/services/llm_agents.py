"""LLM agents."""

import re
import os
import logging
from pypdf import PdfReader
from app.core.schema import LLMAgentResponse, LLMResponse
from anthropic import Anthropic
from app.services.prompt import CLASSIFY_PROMPT, SUMMARIZE_PROMPT, CHAT_SYSTEM_PROMPT
from dotenv import load_dotenv

logger = logging.getLogger(__name__)

# Load ANTHROPIC API KEY set in `.env` file
load_dotenv()


class LLMAgents:
    def __init__(self) -> None:
        self.llm_client = None

    def extract_text(self, pdf_file: str) -> str:
        """Extract text from pdf.

        Args:
            pdf_file (str): Path to pdf file.

        Returns:
            str: Entire contents of pdf as text.
        """
        reader = PdfReader(pdf_file)
        text = "".join(page.extract_text() for page in reader.pages)
        return text

    def process_document(self, pdf_file: str) -> LLMAgentResponse:
        """Run multiple LLM agents to get final response.

        Args:
            pdf_file (str): Path to pdf file.

        Returns:
            LLMAgentResponse: LLM Agent response.
        """
        text = self.extract_text(pdf_file=pdf_file)
        logger.info(f"Text: {text[:500]}")
        # Classify if document is insurance
        logger.info("Verifying insurance doc...")
        is_insurance_doc = self.classify_doc(text)
        logger.info(f"Is insurance doc?: {is_insurance_doc}")
        if not is_insurance_doc:
            return LLMAgentResponse(is_insurance_doc=False)
        # Summarize the document as structured output
        logger.info("Summarizing insurance doc...")
        what_is_good, what_is_bad, what_is_okay = self.summarize(text)
        # Search channel to recommend a video
        recommended_url = self.search_yt_channel(yt_channel="dittoinsurance")
        return LLMAgentResponse(
            is_insurance_doc=True,
            what_is_good=what_is_good,
            what_is_bad=what_is_bad,
            what_is_okay=what_is_okay,
            youtube_video_rec=recommended_url,
        )

    def get_tag_content(self, text: str, tag_name: str):
        pattern = f"<{tag_name}>(.*?)</{tag_name}>"
        match = re.search(pattern, text, re.DOTALL)
        if match:
            return match.group(1).strip()
        return False

    def classify_doc(self, text: str) -> bool:
        """Classify whether the document contains
        insurance related content or not.

        Args:
            text (str): Input document

        Returns:
            bool: Whether document belongs to insurance category.
        """
        response = self.call_llm(prompt=CLASSIFY_PROMPT.format(doc=text))
        return self.get_tag_content(response, tag_name="output")

    def summarize(self, text: str) -> tuple[str, str, str]:
        """_summary_.

        Args:
            text (str): _description_

        Returns:
            tuple[str, str, str]: _description_
        """
        response = self.call_llm(prompt=SUMMARIZE_PROMPT.format(doc=text))
        what_is_good = self.get_tag_content(response, tag_name="what_is_good")
        what_is_bad = self.get_tag_content(response, tag_name="what_is_bad")
        what_is_okay = self.get_tag_content(response, tag_name="what_is_okay")
        return what_is_good, what_is_bad, what_is_okay

    def search_yt_channel(self, yt_channel: str) -> str:
        """_summary_

        Args:
            yt_channel (str): _description_

        Returns:
            str: _description_
        """
        return "https://www.youtube.com/watch?v=zHj_P05L4lg"

    def call_llm(self, prompt: str) -> str:
        """_summary_

        Args:
            prompt (str): _description_

        Returns:
            str: _description_
        """
        if self.llm_client is None:
            self.llm_client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

        response = self.llm_client.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=1024,
            messages=[{"role": "user", "content": f"{prompt}"}],
        )
        logger.info(f"Usage: {response.usage}")
        return str(response.content[0].text)


class LLMChatAgent:
    def __init__(self, pdf_file) -> None:
        self.pdf_file_path = pdf_file
        self.llm_client = None
        self.text = self.extract_text()
        logger.info(f"Text: {self.text[:500]}")

    def extract_text(self) -> str:
        """Extract text from pdf.

        Returns:
            str: Entire contents of pdf as text.
        """
        reader = PdfReader(self.pdf_file_path)
        text = "".join(page.extract_text() for page in reader.pages)
        return text

    def chat_with_doc(self, query: str) -> LLMResponse:
        """Use Claude prompt caching for chatting with the policy document.

        Args:
            query (str): Input question from the user.

        Returns:
            str: Response from LLM.
        """
        if self.llm_client is None:
            self.llm_client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

        response = self.llm_client.beta.prompt_caching.messages.create(
            model="claude-3-5-sonnet-20240620",
            max_tokens=1024,
            system=[
                {
                    "type": "text",
                    "text": f"{CHAT_SYSTEM_PROMPT}",
                },
                {
                    "type": "text",
                    "text": f"<doc> {self.text} </doc>",
                    "cache_control": {"type": "ephemeral"},
                },
            ],
            messages=[
                {
                    "role": "user",
                    "content": f"{query}",
                }
            ],
            extra_headers={"anthropic-beta": "prompt-caching-2024-07-31"},
        )
        logger.info(f"Usage: {response.usage}")
        return LLMResponse(answer=str(response.content[0].text))
