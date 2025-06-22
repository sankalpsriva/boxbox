from fastapi import FastAPI
from app.api.v1.routes import drivers, races

app = FastAPI()

app.include_router(drivers.router, prefix="/api/v1/drivers", tags=["Drivers"])
app.include_router(races.router, prefix="/api/v1/races", tags=["Races"])
