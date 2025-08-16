from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.base import Base

class Driver(Base):
    __tablename__ = "drivers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    image_url = Column(String, nullable=True)
    
    # These columns will be added via migration
    driver_number = Column(Integer, nullable=True)
    nationality = Column(String, nullable=True)
    constructor = Column(String, nullable=True)
    team_color = Column(String, nullable=True)
    
    # Relationships
    ratings = relationship("Rating", back_populates="driver", cascade="all, delete-orphan")
