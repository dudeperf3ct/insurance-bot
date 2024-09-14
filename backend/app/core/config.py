from typing import Literal
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_ignore_empty=True, extra="ignore"
    )

    PROJECT_NAME: str
    ENVIRONMENT: Literal["local", "staging", "production"] = "local"


settings = Settings()  # type: ignore
