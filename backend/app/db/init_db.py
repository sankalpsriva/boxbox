from sqlalchemy.orm import Session
from app.db.base import Base
from app.db.session import engine, get_db
from app.db.models.user import User
from app.db.models.driver import Driver
from app.db.models.race import Race
from app.db.models.rating import Rating
from app.db.migrations import run_migrations
from datetime import datetime
from fastf1.ergast import Ergast
import fastf1 as ff
import logging, requests, json


logger = logging.getLogger(__name__)

def get_driver_data(name_acronym: str) -> dict:
    """Fetch driver data from an external API."""
    try:
        response = requests.get(f"https://api.openf1.org/v1/drivers?name_acronym={name_acronym}&session_key=latest")
        response.raise_for_status()
        
        if len(response.json()) > 0:
            return response.json()[0]
        else:
            print(f"No data found for driver: {name_acronym}")
            return None
    except requests.RequestException as e:
        return {}
    
def seed_drivers(db: Session): 
    
    current_drivers = db.query(Driver).count()
    
    if current_drivers > 0:
        logger.info("Drivers already seeded, skipping...")
        return

    curr_year = datetime.now().year    
    ergast = Ergast()
    curr_driver_standings = ergast.get_driver_standings(season=curr_year).content[0]

    for driver in curr_driver_standings.iterrows():
        curr_driver_from_ergast = driver[1]
        driver_data_from_openf1 = get_driver_data(name_acronym=curr_driver_from_ergast['driverCode'])
        if driver_data_from_openf1:
            db.add(Driver(
                id=curr_driver_from_ergast['position'],
                name=driver_data_from_openf1['full_name'], 
                driver_number=driver_data_from_openf1['driver_number'],
                nationality=curr_driver_from_ergast['driverNationality'], 
                constructor=driver_data_from_openf1['team_name'], 
                team_color=driver_data_from_openf1['team_colour'],
                image_url=driver_data_from_openf1['headshot_url'])
            )
    db.commit()

def init_db() -> None:
    """Initialize database with required tables."""
    try:
        # Create all tables
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
        
        # Run migrations to update existing tables
        run_migrations()
        logger.info("Database migrations completed successfully")
        
        db_gen = get_db()
        db = next(db_gen)
        try: 
            seed_drivers(db)
        finally:
            db.close()
    except Exception as e:
        logger.error(f"Error initializing database: {e}")
        raise
