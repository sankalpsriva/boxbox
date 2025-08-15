from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.base import Base

class Race(Base):
    __tablename__ = "races"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String, index=True)
    date = Column(String, index=True)
    
    # Relationships
    ratings = relationship("Rating", back_populates="race", cascade="all, delete-orphan")
