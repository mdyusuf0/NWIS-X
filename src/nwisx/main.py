from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .experience.api_routes import router

app = FastAPI(title="NWIS-X API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "ok"}
