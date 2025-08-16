# from datetime import datetime
# from fastf1.ergast import Ergast
# import fastf1 as ff
# import requests, json

# ergast = Ergast()

# curr_year = datetime.now().year
# curr_driver_standings = ergast.get_driver_standings(season=curr_year).content[0]

# # df = curr_driver_standings.content[0]

# def get_driver_data(name_acronym: str) -> dict:
#     """Fetch driver data from an external API."""
#     try:
#         response = requests.get(f"https://api.openf1.org/v1/drivers?name_acronym={name_acronym}&session_key=latest")
#         response.raise_for_status()
        
#         if len(response.json()) > 0:
#             print(response.json()[0])
#             return response.json()[0]
#         else:
#             print(f"No data found for driver number: {name_acronym}")
#             return {}
#     except requests.RequestException as e:
#         return {}


# for driver in curr_driver_standings.iterrows():
#     curr_driver_from_ergast = driver[1]
#     driver_data_from_openf1 = get_driver_data(name_acronym=curr_driver_from_ergast['driverCode'])
#     # print(curr_driver_from_ergast)

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
            return {}
    except requests.RequestException as e:
        return {}
    
def seed_drivers(): 
    
    curr_year = datetime.now().year    
    ergast = Ergast()
    curr_driver_standings = ergast.get_driver_standings(season=curr_year).content[0]

    for driver in curr_driver_standings.iterrows():
        curr_driver_from_ergast = driver[1]
        print(curr_driver_from_ergast.keys())
        driver_data_from_openf1 = get_driver_data(name_acronym=curr_driver_from_ergast['driverCode'])
        
        # if driver_data_from_openf1:
        #     id=curr_driver_from_ergast['driverId'],
        #     name=driver_data_from_openf1['full_name'], 
        #     driver_number=driver_data_from_openf1['driver_number'],
        #     nationality=curr_driver_from_ergast['driverNationality'], 
        #     constructor=driver_data_from_openf1['team_name'], 
        #     team_color=driver_data_from_openf1['team_colour'],
        #     image_url=driver_data_from_openf1['headshot_url']
seed_drivers()