import fastf1 as ff
from fastf1.ergast import Ergast
import os               

os.makedirs('app/race_data/cache', exist_ok=True)
ff.Cache.enable_cache('app/race_data/cache')

year=2000
ergast = Ergast()
schedule = ergast.get_race_schedule(season=year)
circuitsName = schedule['circuitName']
events = ff.get_event_schedule(year)

races = []
events = events[events['RoundNumber'] != 0]
# print(events)
for index, name in enumerate(events["EventName"].unique()): 
    races.append({
        "round": int(events['RoundNumber'].iloc[index]),
        "name": name,
        "circuit": circuitsName.iloc[index],
        "date": schedule["raceDate"].iloc[index].strftime("%m-%d-%Y"),
    })

print(races)