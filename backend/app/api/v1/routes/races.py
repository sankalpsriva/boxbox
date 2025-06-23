from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db

router = APIRouter()

@router.get("/")
def get_races(db: Session = Depends(get_db)):
    # Placeholder endpoint for races
    return {"message": "Races endpoint - not implemented yet"}
