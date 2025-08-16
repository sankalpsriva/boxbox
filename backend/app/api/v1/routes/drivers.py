from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.crud import crud_driver
from app.schemas.driver import Driver, DriverCreate, DriverUpdate

router = APIRouter()

@router.get("/top", response_model=List[dict])
def get_top_drivers(limit: int = 5, db: Session = Depends(get_db)):
    """Get the top-rated drivers."""
    return crud_driver.get_top_drivers(db, limit)

@router.get("/", response_model=List[Driver])
def get_all_drivers(db: Session = Depends(get_db)):
    """Get all drivers."""
    return crud_driver.get_all_drivers(db)

@router.get("/{driver_id}", response_model=Driver)
def get_driver(driver_id: int, db: Session = Depends(get_db)):
    """Get a specific driver by ID."""
    driver = crud_driver.get_driver(db, driver_id)
    if not driver:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Driver with ID {driver_id} not found"
        )
    return driver

@router.post("/", response_model=Driver, status_code=status.HTTP_201_CREATED)
def create_driver(driver: DriverCreate, db: Session = Depends(get_db)):
    """Create a new driver."""
    # Check if driver with same name already exists
    db_driver = crud_driver.get_driver_by_name(db, driver.name)
    if db_driver:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Driver with name {driver.name} already exists"
        )
    return crud_driver.create_driver(db, driver)

@router.put("/{driver_id}", response_model=Driver)
def update_driver(driver_id: int, driver: DriverUpdate, db: Session = Depends(get_db)):
    """Update an existing driver."""
    db_driver = crud_driver.update_driver(db, driver_id, driver)
    if not db_driver:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Driver with ID {driver_id} not found"
        )
    return db_driver

@router.delete("/{driver_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_driver(driver_id: int, db: Session = Depends(get_db)):
    """Delete a driver."""
    success = crud_driver.delete_driver(db, driver_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Driver with ID {driver_id} not found"
        )
    return None
