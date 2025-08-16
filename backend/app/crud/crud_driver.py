from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from typing import List, Optional
from app.db.models.driver import Driver
from app.db.models.rating import Rating
from app.schemas.driver import DriverCreate, DriverUpdate

def get_top_drivers(db: Session, limit: int = 5):
    return (
        db.query(
            Driver.id,
            Driver.name,
            Driver.image_url,
            func.avg(Rating.rating).label("avg_rating")
        )
        .join(Rating, Driver.id == Rating.driver_id)
        .group_by(Driver.id)
        .order_by(desc("avg_rating"))
        .limit(limit)
        .all()
    )

def get_all_drivers(db: Session) -> List[Driver]:
    """Get all drivers from the database."""
    return db.query(Driver).all()

def get_driver(db: Session, driver_id: int) -> Optional[Driver]:
    """Get a specific driver by ID."""
    return db.query(Driver).filter(Driver.id == driver_id).first()

def get_driver_by_name(db: Session, name: str) -> Optional[Driver]:
    """Get a specific driver by name."""
    return db.query(Driver).filter(Driver.name == name).first()

def create_driver(db: Session, driver: DriverCreate) -> Driver:
    """Create a new driver."""
    db_driver = Driver(
        name=driver.name,
        driver_number=driver.driver_number,
        nationality=driver.nationality,
        constructor=driver.constructor,
        team_color=driver.team_color,
        image_url=driver.image_url
    )
    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)
    return db_driver

def update_driver(db: Session, driver_id: int, driver: DriverUpdate) -> Optional[Driver]:
    """Update an existing driver."""
    db_driver = get_driver(db, driver_id)
    if not db_driver:
        return None
    
    # Update driver attributes
    driver_data = driver.model_dump(exclude_unset=True)
    for key, value in driver_data.items():
        setattr(db_driver, key, value)
    
    db.commit()
    db.refresh(db_driver)
    return db_driver

def delete_driver(db: Session, driver_id: int) -> bool:
    """Delete a driver."""
    db_driver = get_driver(db, driver_id)
    if not db_driver:
        return False
    
    db.delete(db_driver)
    db.commit()
    return True
