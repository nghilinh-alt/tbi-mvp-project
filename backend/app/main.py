"""TBI MVP Backend API Server."""
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
import json
import os
from typing import List, Optional
from datetime import datetime
import uuid

app = FastAPI(
    title="TBI Employment Pathways MVP API",
    description="Backend API for TBI Employment Pathways MVP application",
    version="0.1.0"
)


class AuthUser(BaseModel):
    email: str
    password: str
    full_name: str


class UserTokenPair(BaseModel):
    token: str
    refresh_token: str


class TokenData(BaseModel):
    email: str


class DashboardStats(BaseModel):
    total_users: int
    registered_this_month: int
    active_jobs: int
    jobs_completed: int
    pending_journeys: int


class JourneyStep(BaseModel):
    id: str
    job_id: str
    job_title: str
    step_number: int
    title: str
    description: str
    completed: bool = False
    estimated_days: Optional[int] = None
    actual_days: Optional[int] = None


class SkillsData(BaseModel):
    skills: List[dict]
    skill_level: str
    experience_years: int
    preferred_role: str


class JobMatch(BaseModel):
    job_id: str
    job_title: str
    company: str
    salary_range: Optional[str] = None
    location: Optional[str] = None
    match_score: float


class JourneyComplete(BaseModel):
    completed_at: datetime
    journey_length_days: int
    jobs_completed: int
    final_job_id: str
    final_job_title: str


@app.get("/")
def root():
    """Root endpoint."""
    return {
        "service": "TBI Employment Pathways MVP",
        "version": "0.1.0",
        "status": "running"
    }


@app.get("/api/auth/register")
async def register_user(user: AuthUser):
    """Register a new user."""
    # Simulate registration with in-memory storage
    email = f"{user.email}@example.com"
    
    return {
        "message": "User registered successfully",
        "email": email,
        "status": 200
    }


@app.post("/api/auth/login")
async def login_user(token_pair: UserTokenPair):
    """Login and receive tokens."""
    token = f"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJl...[truncated]"
    refresh_token = f"rft_{token}_{str(uuid.uuid4())}"
    
    return {
        "access_token": token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "status": 200
    }


@app.get("/api/dashboard/stats")
async def get_dashboard_stats():
    """Get dashboard statistics."""
    today = datetime.now()
    first_day_month = today.replace(day=1)
    
    return DashboardStats(
        total_users=1542,
        registered_this_month=328,
        active_jobs=67,
        jobs_completed=2340,
        pending_journeys=145
    ).model_dump()


@app.get("/api/journey/steps")
async def get_journey_steps(job_title: str):
    """Get journey steps for a job role."""
    
    journeys = {
        "Developer": [
            JourneyStep(id="1", job_id="dev-frontend", job_title="Frontend Developer", step_number=1, title="React Fundamentals", description="Learn React basics including components, props, state, and hooks.", completed=False, estimated_days=3),
            JourneyStep(id="2", job_id="dev-frontend", job_title="Frontend Developer", step_number=2, title="State Management", description="Master Redux Toolkit, Context API, and state management patterns.", completed=False, estimated_days=2),
            JourneyStep(id="3", job_id="dev-frontend", job_title="Frontend Developer", step_number=3, title="CSS & Styling", description="Learn Tailwind CSS, CSS Grid/Flexbox, and responsive design principles.", completed=False, estimated_days=2),
            JourneyStep(id="4", job_id="dev-frontend", job_title="Frontend Developer", step_number=4, title="Performance Optimization", description="Optimize bundle size, implement code splitting, and lazy loading.", completed=False, estimated_days=1),
        ],
        "Designer": [
            JourneyStep(id="5", job_id="des-uiux", job_title="UI/UX Designer", step_number=1, title="Design Fundamentals", description="Master design theory, color theory, typography, and layout principles.", completed=False, estimated_days=2),
            JourneyStep(id="6", job_id="des-uiux", job_title="UI/UX Designer", step_number=2, title="Figma & Prototyping", description="Learn Figma tools, prototyping, and interactive design patterns.", completed=False, estimated_days=3),
            JourneyStep(id="7", job_id="des-uiux", job_title="UI/UX Designer", step_number=3, title="Design Systems", description="Build and maintain scalable design systems and component libraries.", completed=False, estimated_days=2),
        ],
        "Project Manager": [
            JourneyStep(id="8", job_id="pm-agile", job_title="Agile Project Manager", step_number=1, title="Agile Fundamentals", description="Learn Scrum, Kanban, and Agile methodologies.", completed=False, estimated_days=2),
            JourneyStep(id="9", job_id="pm-agile", job_title="Agile Project Manager", step_number=2, title="Project Management Tools", description="Master Jira, Confluence, and project tracking tools.", completed=False, estimated_days=1),
        ]
    }
    
    return journeys.get(job_title.upper(), [])


@app.post("/api/skills/assessment")
async def submit_skills_assessment(data: SkillsData):
    """Submit skills assessment."""
    # Store skills data (would persist in database)
    return {
        "message": "Skills assessment submitted",
        "status": 200,
        "skills_count": len(data.skills)
    }


@app.get("/api/jobs/matching")
async def get_job_matches(skills: Optional[str] = None):
    """Get recommended job matches based on skills."""
    
    jobs = [
        JobMatch(job_id="1", job_title="Frontend Developer", company="TechCorp", salary_range="$80k - $120k"),
        JobMatch(job_id="2", job_title="UI/UX Designer", company="DesignAgency", salary_range="$70k - $100k"),
        JobMatch(job_id="3", job_title="Full Stack Developer", company="StartupX", salary_range="$90k - $140k"),
    ]
    
    return {"jobs": jobs, "status": 200}


@app.get("/api/journeys/complete")
async def mark_journey_complete(journey_complete: JourneyComplete):
    """Mark journey as complete and celebrate."""
    
    return {
        "message": "Congratulations! You've completed your journey!",
        "status": 200,
        "journey_summary": {
            "completed_at": journey_complete.completed_at.isoformat(),
            "journey_length_days": journey_complete.journey_length_days,
            "jobs_completed": journey_complete.jobs_completed,
            "final_job": f"{journey_complete.final_job_title}"
        }
    }


@app.get("/api/progress")
async def get_progress(token: Optional[str] = None):
    """Get user progress for dashboard."""
    
    return {
        "status": 200,
        "current_step": 3,
        "total_steps": 12,
        "completion_percentage": 25,
        "last_active": datetime.now().isoformat()
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
