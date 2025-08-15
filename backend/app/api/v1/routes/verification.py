from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models.user import User
from app.schemas.user import VerificationToken
from app.utils.token import create_verification_token, verify_token
from app.utils.email import send_verification_email
from app.crud.crud_user import get_user_by_email, update_user_verification
import os

router = APIRouter()

# Get frontend URL from environment variables, default to localhost
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

@router.post("/request-verification", status_code=status.HTTP_202_ACCEPTED)
def request_verification(email: str, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """
    Request a new verification email
    """
    # Check if user exists
    user = get_user_by_email(db, email=email)
    if not user:
        # Don't reveal that the user doesn't exist, just return success
        return {"message": "If your email is registered, a verification link has been sent"}
    
    # Check if already verified
    if user.is_verified:
        return {"message": "Email is already verified"}
    
    # Create verification token
    token = create_verification_token(email)
    
    # Send verification email in the background
    background_tasks.add_task(
        send_verification_email,
        email=user.email,
        username=user.username,
        token=token,
        base_url=FRONTEND_URL
    )
    
    return {"message": "If your email is registered, a verification link has been sent"}

@router.post("/verify-email", status_code=status.HTTP_200_OK)
def verify_email(token_data: VerificationToken, db: Session = Depends(get_db)):
    """
    Verify user email using token
    """
    try:
        # Verify token
        payload = verify_token(token_data.token)
        
        # Get email from payload
        email = payload.get("sub")
        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid token"
            )
        
        # Check if user exists
        user = get_user_by_email(db, email=email)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Check if already verified
        if user.is_verified:
            return {"message": "Email is already verified"}
        
        # Update verification status
        update_user_verification(db, user=user, is_verified=True)
        
        return {"message": "Email verified successfully"}
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
