from sqlalchemy.orm import Session
from app.db.base import Base
from app.db.session import engine
from app.db.models.user import User
from app.db.models.driver import Driver
from app.db.models.race import Race
from app.db.models.rating import Rating
from app.db.migrations import run_migrations
import logging

logger = logging.getLogger(__name__)

def init_db() -> None:
    """Initialize database with required tables."""
    try:
        # Create all tables
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
        
        # Run migrations to update existing tables
        run_migrations()
        logger.info("Database migrations completed successfully")
    except Exception as e:
        logger.error(f"Error initializing database: {e}")
        raise
