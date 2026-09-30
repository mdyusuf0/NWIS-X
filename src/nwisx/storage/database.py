from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ..config import settings

# TODO: Add postgis support in URL
DATABASE_URL = f"postgresql://{settings.db_user}:{settings.db_pass}@{settings.db_host}:{settings.db_port}/{settings.db_name}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
