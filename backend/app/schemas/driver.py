from pydantic import BaseModel
from typing import Optional, List

# Base Driver schema with common attributes
class DriverBase(BaseModel):
    name: str
    driver_number: Optional[int] = None
    nationality: Optional[str] = None
    constructor: Optional[str] = None
    team_color: Optional[str] = None
    image_url: Optional[str] = None

# Schema for creating a Driver
class DriverCreate(DriverBase):
    pass

# Schema for updating a Driver (all fields optional)
class DriverUpdate(BaseModel):
    name: Optional[str] = None
    driver_number: Optional[int] = None
    nationality: Optional[str] = None
    constructor: Optional[str] = None
    team_color: Optional[str] = None
    image_url: Optional[str] = None

# Schema for Driver in response (includes ID)
class Driver(DriverBase):
    id: int
    
    class Config:
        orm_mode = True
        from_attributes = True
