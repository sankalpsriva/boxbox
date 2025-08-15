from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username: str
    password: str
    
class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_verified: bool = False

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class VerificationToken(BaseModel):
    token: str
