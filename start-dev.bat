@echo off
echo ========================================
echo TBI-MVP Full Stack - Quick Start Script
echo ========================================
echo.
setlocal enabledelayedexpansion

echo Step 1: Starting Backend API on port 8000...
start cmd /c "cd backend && venv_backend\Scripts\activate && python -m uvicorn app.main:app --reload"
timeout /t 2 >nul

echo Step 2: Starting Frontend App on port 5173...
start cmd /c "cd frontend && npm run dev"

echo Step 3: Starting Admin Portal on port 5174...
start cmd /c "cd ..\frontend-admin && npm run dev"

echo ========================================
echo All servers are starting!
echo ========================================
echo.
echo Backend API:    http://localhost:8000/docs
echo Participant App:http://localhost:5173
echo Admin Portal:   http://localhost:5174
echo.
echo Use Ctrl+Click to open links in browser
echo.

pause
