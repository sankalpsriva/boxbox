from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routes import races  # Direct import
from app.api.v1.routes import drivers  # Direct import
from app.api.v1.routes import auth
from app.api.v1.routes import verification
from app.db.init_db import init_db
from app.core.config import settings
from app.middleware.security import SecurityMiddleware
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, filename='app.log', format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url="/api/v1/openapi.json"
)

# Add security middleware if enabled
if False:
    logger.info("API Security is ENABLED")
    app.add_middleware(SecurityMiddleware)
    
    # Configure CORS for allowed hosts only
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_HOSTS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    logger.info("API Security is DISABLED")
    # Allow all origins when security is disabled
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Add races router directly for testing
app.include_router(races.router, prefix="/api/v1", tags=["races"])
app.include_router(drivers.router, prefix="/api/v1", tags=["drivers"])
app.include_router(auth.router, prefix="/api/v1", tags=["auth"])
app.include_router(verification.router, prefix="/api/v1", tags=["verification"])

@app.on_event("startup")
async def startup_event():
    logger.info("Starting up application...")
    # Initialize database tables
    init_db()
    logger.info("Database initialized")

@app.get("/")
def read_root():
    return {"message": "BoxBox API is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}