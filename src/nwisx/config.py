from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """App configuration settings loaded from .env"""
    db_host: str = "localhost"
    db_port: int = 5432
    db_user: str = "nwisx_user"
    db_pass: str = "nwisx_pass"
    db_name: str = "nwisx_db"
    redis_url: str = "redis://localhost:6379/0"
    openai_api_key: str = ""
    witsml_url: str = ""
    witsml_user: str = ""
    witsml_pass: str = ""

    class Config:
        env_file = ".env"

settings = Settings()
