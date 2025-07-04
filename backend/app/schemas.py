from pydantic import BaseModel, Field
from typing import List, Optional

# Movie Schemas
class Movie(BaseModel):
    id: int
    title: str
    director: str
    release_year: int
    synopsis: str
    poster_url: str

# User Schemas
class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str = Field(..., min_length=4)

class User(UserBase):
    id: int

class UserInDB(User):
    hashed_password: str

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None