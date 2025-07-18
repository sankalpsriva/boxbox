from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routes import races  # Direct import
from app.api.v1.routes import drivers  # Direct import

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add races router directly for testing
app.include_router(races.router, prefix="/api/v1", tags=["races"])
app.include_router(drivers.router, prefix="/api/v1", tags=["drivers"])

@app.get("/")
def read_root():
    return {"message": "BoxBox API is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}