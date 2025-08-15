from jose import jwt
import os
from datetime import datetime, timedelta, timezone
import secrets

# Get environment variables
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
VERIFICATION_TOKEN_EXPIRE_HOURS = 24

def create_verification_token(email: str) -> str:
    """
    Create a verification token for email confirmation
    """
    # Add expiry time (24 hours)
    expire = datetime.now(timezone.utc) + timedelta(hours=VERIFICATION_TOKEN_EXPIRE_HOURS)
    
    # Create payload
    to_encode = {
        "sub": email,
        "exp": expire,
        "type": "email_verification",
        "jti": secrets.token_hex(16)  # Add a unique ID to prevent token reuse
    }
    
    # Encode token
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str) -> dict:
    """
    Verify a token and return its payload if valid
    """
    try:
        # Decode and verify token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        # Check if token is for email verification
        if payload.get("type") != "email_verification":
            raise ValueError("Invalid token type")
        
        return payload
    except jwt.JWTError:
        raise ValueError("Invalid token")
    except Exception as e:
        raise ValueError(f"Token verification error: {str(e)}")
