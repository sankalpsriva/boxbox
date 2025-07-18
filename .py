import fastf1 as ff
from fastf1.ergast import Ergast
import pandas as pd

ergast = Ergast()
schedule = ergast.get_race_schedule(season=2023)
circuitsName = schedule['circuitName']
events = ff.get_event_schedule(2023)

races = []
for index, name in enumerate(events["EventName"].unique()): 
    races.append({
        "id": index,
        "name": name,
        "circuit": circuitsName.iloc[index - 1],
        "round": circuitsName.index[index - 1] + 1,
        "date": schedule["raceDate"].iloc[index - 1].strftime("%m-%d-%Y"),
})
    
print(races[1: ])