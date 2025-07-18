from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from typing import Optional
from datetime import datetime
import fastf1 as ff
from fastf1.ergast import Ergast
import os

router = APIRouter()

os.makedirs('app/race_data/cache', exist_ok=True)
ff.Cache.enable_cache('app/race_data/cache')

# TODO: Implement the logic to get races by season
@router.get("/races")
def get_races_by_season(db: Session = Depends(get_db), year: int = Optional[2023]) -> list:
    ergast = Ergast()
    schedule = ergast.get_race_schedule(season=year)
    circuitsName = schedule['circuitName']
    events = ff.get_event_schedule(year)
    
    if year < 2000 or year > datetime.now().year:
        raise HTTPException(status_code=400, detail="Season year must be between 2000 and 2023")

    races = []
    for index, name in enumerate(events["EventName"].unique()): 
        races.append({
            "round": circuitsName.index[index - 1] + 1,
            "name": name,
            "circuit": circuitsName.iloc[index - 1],
            "date": schedule["raceDate"].iloc[index - 1].strftime("%m-%d-%Y"),
    })

    return races[1: ] # First entry is a test event, so we skip it

@router.get("/top")
def get_top_three_races(db: Session = Depends(get_db)) -> dict:
    """
    Fetch the top three races based on average rating.
    """
    return [
        {"id": 1, "name": "Monaco Grand Prix", "avg_rating": 4.8},
        {"id": 2, "name": "British Grand Prix", "avg_rating": 4.7},
        {"id": 3, "name": "Japanese Grand Prix", "avg_rating": 4.6}
    ]