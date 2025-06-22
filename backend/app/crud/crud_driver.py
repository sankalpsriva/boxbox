from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from app.db.models.driver import Driver
from app.db.models.rating import Rating

def get_top_drivers(db: Session, limit: int = 5):
    return (
        db.query(
            Driver.id,
            Driver.name,
            Driver.image_url,
            func.avg(Rating.rating).label("avg_rating")
        )
        .join(Rating, Driver.id == Rating.driver_id)
        .group_by(Driver.id)
        .order_by(desc("avg_rating"))
        .limit(limit)
        .all()
    )
