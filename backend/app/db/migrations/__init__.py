from app.db.migrations.add_is_verified import run_migrations as run_is_verified_migration
from app.db.migrations.add_driver_columns import run_migrations as run_driver_columns_migration
import logging

logger = logging.getLogger(__name__)

def run_migrations():
    """Run all database migrations."""
    logger.info("Running database migrations...")
    run_is_verified_migration()
    run_driver_columns_migration()
    logger.info("All migrations completed successfully")
