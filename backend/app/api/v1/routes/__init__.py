from fastapi import APIRouter
from app.api.v1.routes import races  
from app.api.v1.routes import drivers   

api_router = APIRouter()

api_router.include_router(races.router, tags=["races"])         
api_router.include_router(drivers.router, tags=["drivers"])