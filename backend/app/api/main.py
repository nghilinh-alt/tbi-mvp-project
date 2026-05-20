#!/usr/bin/env python3
"""
TBI Employment Pathways MVP - Backend API
FastAPI server for QLD Government PSP Challenge project
"""

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import Optional, List
import datetime
import uuid
import os

app = FastAPI(
    title="TBI Employment Pathways API",
    description="QLD Government PSP Challenge - Employment pathways tracking system",
    version="0.1.0"
)

# Security configuration
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Mock database (replace with real DB in production)
users_db = {
    "admin": {"password": "admin123", "role": "admin"},
    "participant": {"password": "demo", "role": "participant"}
}

# JWT Token scheme
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"


# Request models
class User(BaseModel):
    id: uuid.UUID
    username: str
    email: str
    role: str
    tbi_diagnosis_date: Optional[datetime.date] = None
    
    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
    role: Optional[str] = None


class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    role: str = "participant"


class EmploymentJourney(BaseModel):
    user_id: uuid.UUID
    current_stage: str
    stage_date: datetime.date
    notes: Optional[str] = None


# Pydantic models for authentication
class TokenPayload(BaseModel):
    username: str
    role: str


# Dependencies
async def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        from jose import jwt
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        role: str = payload.get("role")
        if username is None:
            raise credentials_exception
        return {"username": username, "role": role}
    except Exception as e:
        raise credentials_exception


# Health check endpoint (required for load balancers)
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.datetime.now().isoformat()}


# Auth endpoints
@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_creds = users_db.get(form_data.username)
    if not user_creds or not form_data.password == user_creds["password"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    # Create JWT token
    from jose import jwt
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    access_token = jwt.encode({
        "sub": form_data.username,
        "role": user_creds["role"],
        "exp": int(expire.timestamp())
    }, SECRET_KEY, algorithm=ALGORITHM)

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# User management endpoints (admin only)
@app.get("/users/", response_model=List[User])
async def list_users(current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    # In real app, query database here
    return []


# Employment journey endpoints (participant & admin)
@app.get("/journeys/{user_id}/")
async def get_employment_journeys(user_id: uuid.UUID, current_user: dict = Depends(get_current_user)):
    """Get employment progression for a user"""
    # Query database here
    
    mock_journey = {
        "stages": [
            {"stage": "awareness", "date": "2024-01-15", "notes": "Program enrollment"},
            {"stage": "assessment", "date": "2024-01-22", "notes": "Skills & capabilities assessed"},
        ]
    }
    
    return mock_journey


@app.post("/journeys/{user_id}/")
async def record_stage_progress(user_id: uuid.UUID, journey: EmploymentJourney):
    """Record employment stage completion"""
    # Validate user has access to this record
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Need admin credentials",
    )


# Skills assessment endpoints
@app.get("/skills/{user_id}/")
async def get_skills_assessments(user_id: uuid.UUID):
    """Get completed skills assessments"""
    raise HTTPException(status_code=401, detail="Admin only")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
