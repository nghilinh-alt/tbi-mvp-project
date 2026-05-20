# 🏗️ TBI Employment Pathways MVP - Deployment Guide

## Quick Start: Local Development Deployment

### Prerequisites
- **Node.js**: v18+ (recommended)
- **Python**: v3.9+ for FastAPI backend
- **npm** or **pnpm** package manager

---

## 📦 Part 1: Complete Project Setup (First Time)

### Step 1: Create Virtual Environments

```bash
# Python Backend - Create virtual environment
python -m venv venv_backend
venv_backend\Scripts\activate  # Windows
# or
source venv_backend/bin/activate  # Unix/Mac

# Install backend dependencies
pip install fastapi uvicorn pydantic[email] python-jose[cryptography] passlib[bcrypt] sqlalchemy alembic

# React Frontend - Initialize npm
cd frontend
npm install

# Admin Frontend
cd ../frontend-admin
npm install

# Navigate back to root
cd ..
```

### Step 2: Install Backend Dependencies

```bash
# From project root
python -m venv venv_backend
venv_backend\Scripts\activate
pip install fastapi uvicorn pydantic[email] python-jose[cryptography] passlib[bcrypt] sqlalchemy alembic
deactivate

cd frontend-admin
npm install
cd ..
```

### Step 3: Create .env File (Copy from .env.example)

```bash
# Copy environment template
copy .env.example .env          # Windows cmd
# or
cp .env.example .env            # Unix/Mac

# Edit .env and set:
# SECRET_KEY=your-actual-secret-key-change-in-production
# DATABASE_URL="sqlite:///./app.db" for local, or your postgres URL
```

### Step 4: Load Dummy Data

```bash
# Place dummy_users.json in backend/data/
copy backend\data\dummy_users.json backend\data\dummy_users.json
# (Already done if you've been working on the project)
```

---

## 🚀 Part 2: Start Local Servers

### Option A: Run Both Servers Separately

#### Terminal 1 - Backend API Server
```bash
cd backend
venv_backend\Scripts\activate   # or source venv_backend/bin/activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Backend API available at**: `http://localhost:8000`

#### Terminal 2 - Participant Frontend
```bash
cd frontend
npm run dev
```

**Participant App available at**: `http://localhost:5173`

#### Terminal 3 (Optional) - Admin Portal
```bash
cd frontend-admin  
npm run dev
```

**Admin Portal available at**: `http://localhost:5174`

---

### Option B: Single Command to Start Everything

Create a `start-all.bat` file in project root:

```batch
@echo off
echo ============================================
echo Starting TBI-MVP Full Stack Application
echo ============================================
echo.

echo [Backend API] Starting FastAPI on port 8000...
start "TBI Backend API" cmd /c "venv_backend\Scripts\activate && python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

echo [Participant App] Starting frontend on port 5173...
start "TBI Participant App" cmd /c "cd frontend && npm run dev"

echo [Admin Portal] Starting admin portal on port 5174...
start "TBI Admin Portal" cmd /c "cd frontend-admin && npm run dev"

echo.
echo ============================================
echo All servers starting in separate windows!
echo Backend: http://localhost:8000
echo Participant App: http://localhost:5173
echo Admin Portal: http://localhost:5174
echo ============================================
pause
```

---

## 🎯 Part 3: Test the Application

### Test with Dummy Users

1. **Access Login Page**: `http://localhost:5173`
2. **Login as Participant** (use credentials from dummy_users.json):
   - Email: `sarah.johnson@participant.example.com`
   - Password: `hashed:demo123`
   
3. **Explore Features**:
   - View dashboard overview
   - Check journey timeline
   - Complete skills assessment
   - Browse job matching opportunities

4. **Access Admin Portal** (if configured):
   - Email: `admin@tbi-mvp.example.com`
   - Navigate to user management dashboard

---

## 🔒 Part 4: Security Notes for Production

### Before deploying to any production environment:

```python
# In backend/app/main.py or config file
SECRET_KEY = "change-this-to-a-long-random-string-min-32-chars"
DEBUG = False
DATABASE_URL = "postgresql://user:password@your-db-host:5432/tbi_mvp"
CORS_ORIGINS = "https://your-production-domain.com"
```

### Essential Production Checklist:
- [ ] Change `SECRET_KEY` to a strong random string (use `openssl rand -base64 32`)
- [ ] Set `DEBUG=false` in `.env`
- [ ] Use PostgreSQL or production database, not SQLite
- [ ] Update `CORS_ORIGINS` to your production domain(s)
- [ ] Enable HTTPS/SSL for all endpoints
- [ ] Set up proper firewall rules
- [ ] Configure rate limiting on API endpoints
- [ ] Review and restrict sensitive file access

---

## 🐳 Part 5: Docker Deployment (Optional - Advanced)

Create `Dockerfile` in project root for containerized deployment:

```dockerfile
# Multi-stage Dockerfile for TBI-MVP
FROM python:3.11-slim AS backend-builder
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend ./backend
WORKDIR /app/backend
COPY . .

RUN ["pip", "install", "-r", "requirements.txt"]

FROM python:3.11-slim AS backend
ENV PYTHONUNBUFFERED=1
COPY --from=backend-builder /usr/local/lib/python3.11/site-packages/ /usr/local/lib/python3.11/site-packages/
COPY --from=backend-builder /app/backend ./app
WORKDIR /app

# React Frontend Stage
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Final Production Image
FROM nginx:alpine
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run Docker container:
```bash
docker build -t tbi-mvp .
docker run -p 80:80 tbi-mvp
```

---

## 🌐 Part 6: Cloud Deployment Options

### Deploy to Render.com (Free Tier):
1. Push code to GitHub
2. Go to [render.com](https://render.com) and create account
3. Create new Web Service from GitHub repo
4. Set environment variables from `.env.example`
5. Runtime: `npm run dev` (or use provided docker image)
6. Deploy! Free SSL, auto-HTTPS included

### Deploy to Railway.app:
1. Install Railway CLI or push to GitHub
2. Connect repository
3. Add environment variables
4. Deploy with one click

### Deploy to Vercel (Frontend only):
```bash
npm run build
vercel --prod
```

---

## 🧪 Part 7: Running Integration Tests

```bash
# Install test dependencies
cd backend
pip install pytest pytest-asyncio httpx

# Run integration tests
pytest backend/tests/integration.test.ts -v
```

---

## 📝 Part 8: API Documentation (Swagger)

Backend automatically serves interactive API docs at:
`http://localhost:8000/docs`

View available endpoints, request/response schemas, and test calls directly in browser.

---

## 🔧 Troubleshooting

### Backend won't start:
```bash
# Check if port 8000 is already in use
netstat -ano | findstr :8000

# Kill process using port 8000
taskkill /F /PID <process-id>
```

### Frontend shows blank page:
```bash
cd frontend
npm run dev -- --host=0.0.0.0
```

### CORS errors:
Update `CORS_ORIGINS` in `.env` to include your frontend URL

---

## 📚 Project Structure Summary

```
tbi-mvp-project/
├── backend/                    # FastAPI backend API
│   ├── app/main.py            # Main FastAPI application
│   ├── data/dummy_users.json  # Sample user data
│   ├── requirements.txt       # Python dependencies
│   └── tests/                 # Test suite
├── frontend/                  # Participant React app
│   ├── src/pages/            # Auth, Dashboard, Journey, Skills, Jobs
│   ├── src/utils/            # Accessibility helpers
│   └── package.json          # Node dependencies
├── frontend-admin/           # Admin React portal
│   └── src/pages/           # User management dashboard
├── .env.example              # Environment template
├── README.md                 # This deployment guide
└── start-all.bat            # One-click start script
```

---

## ✅ Deployment Complete!

Your TBI-MVP is ready. Access your application at:
- **Backend API**: `http://localhost:8000` (or docs at `/docs`)
- **Participant App**: `http://localhost:5173`
- **Admin Portal**: `http://localhost:5174`

Test with dummy credentials from `backend/data/dummy_users.json`!

---

**🎉 Congratulations! Your accessible employment platform is deployed and ready for users!**
