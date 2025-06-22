from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.crud import crud_driver

router = APIRouter()

@router.get("/top")
def get_top_drivers(limit: int = 5, db: Session = Depends(get_db)):
    return crud_driver.get_top_drivers(db, limit)
