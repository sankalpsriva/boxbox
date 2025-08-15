from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class Rating(Base):
    __tablename__ = "ratings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    driver_id = Column(Integer, ForeignKey("drivers.id"))
    race_id = Column(Integer, ForeignKey("races.id"))
    rating = Column(Float)
    
    # Relationships
    user = relationship("User", back_populates="ratings")
    driver = relationship("Driver", back_populates="ratings")
    race = relationship("Race", back_populates="ratings")
