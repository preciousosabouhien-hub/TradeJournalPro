from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .api.v1.api import api_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Midas Tradejournal Pro API",
              version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router,prefix="/api/v1")

@app.get("/")
def home():
    return {
        "message": "Tradejournal Pro API is running!"
            }
