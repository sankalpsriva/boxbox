from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from typing import Optional
import fastf1 as ff
from fastf1.ergast import Ergast
import os

router = APIRouter()

os.makedirs('app/race_data/cache', exist_ok=True)
ff.Cache.enable_cache('app/race_data/cache')

# TODO: Implement the logic to get races by season
@router.get("/races")
def get_races_by_season(db: Session = Depends(get_db)) -> list:
    ergast = Ergast()
    circuitsName = ergast.get_circuits(season=2023)['circuitName']
    print(type(circuitsName))
    print(circuitsName.iloc[0])
    events = ff.get_event_schedule(2023)
    races = []
    for index, name in enumerate(events["EventName"].unique()): 
        races.append({
            "id": index,
            "name": name,
            "circuit": "",
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