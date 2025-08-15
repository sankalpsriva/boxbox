import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(SQLALCHEMY_DATABASE_URL)

def get_db():
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()  # Ensure the session is closed after use