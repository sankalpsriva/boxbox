from sqlalchemy import text
from app.db.session import engine
import logging

logger = logging.getLogger(__name__)

def run_migrations():
    """Run database migrations to update schema."""
    try:
        # Create a connection to run SQL directly
        with engine.connect() as conn:
            # Check if is_verified column exists in users table
            result = conn.execute(text(
                "SELECT column_name FROM information_schema.columns "
                "WHERE table_name='users' AND column_name='is_verified'"
            ))
            
            # If column doesn't exist, add it
            if not result.fetchone():
                logger.info("Adding is_verified column to users table")
                conn.execute(text(
                    "ALTER TABLE users ADD COLUMN is_verified BOOLEAN DEFAULT FALSE"
                ))
                conn.commit()
                logger.info("Added is_verified column successfully")
            else:
                logger.info("is_verified column already exists")
                
    except Exception as e:
        logger.error(f"Error running migrations: {e}")
        raise
