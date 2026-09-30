from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./nwisx.db"
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    MODEL_PATH: str = "models/"
    SECRET_KEY: str = "supersecretkey"
    DEBUG: bool = True
    
    class Config:
        env_file = ".env"

settings = Settings()
