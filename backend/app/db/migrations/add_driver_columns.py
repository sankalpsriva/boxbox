from sqlalchemy import Column, String, Integer
from sqlalchemy.sql import text
import logging

logger = logging.getLogger(__name__)

def run_migrations(engine=None):
    """Add driver_number, nationality, constructor, and team_color columns to drivers table."""
    from app.db.session import engine as db_engine
    
    # Use provided engine or default
    engine = engine or db_engine
    
    try:
        # Check if the columns already exist
        with engine.connect() as connection:
            # Check if driver_number column exists
            result = connection.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'drivers' AND column_name = 'driver_number'"))
            has_driver_number = result.scalar() is not None
            
            # Check if nationality column exists
            result = connection.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'drivers' AND column_name = 'nationality'"))
            has_nationality = result.scalar() is not None
            
            # Check if constructor column exists
            result = connection.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'drivers' AND column_name = 'constructor'"))
            has_constructor = result.scalar() is not None
            
            # Check if team_color column exists
            result = connection.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'drivers' AND column_name = 'team_color'"))
            has_team_color = result.scalar() is not None
            
            # Add the missing columns
            if not has_driver_number:
                connection.execute(text("ALTER TABLE drivers ADD COLUMN driver_number INTEGER"))
                logger.info("Added driver_number column to drivers table")
                
            if not has_nationality:
                connection.execute(text("ALTER TABLE drivers ADD COLUMN nationality VARCHAR"))
                logger.info("Added nationality column to drivers table")
                
            if not has_constructor:
                connection.execute(text("ALTER TABLE drivers ADD COLUMN constructor VARCHAR"))
                logger.info("Added constructor column to drivers table")
                
            if not has_team_color:
                connection.execute(text("ALTER TABLE drivers ADD COLUMN team_color VARCHAR"))
                logger.info("Added team_color column to drivers table")
                
            connection.commit()
    except Exception as e:
        logger.error(f"Error adding columns to drivers table: {e}")
        raise
