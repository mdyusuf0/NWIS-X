from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.nwisx.experience.api_routes import router
from src.nwisx.storage.database import engine, Base, SessionLocal
from src.nwisx.seed_data import seed_sample_data

app = FastAPI(title="NWIS-X API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        from src.nwisx.storage.models import Well
        if db.query(Well).count() == 0:
            seed_sample_data(db)
    finally:
        db.close()

@app.get("/health")
def health_check():
    return {"status": "healthy"}
