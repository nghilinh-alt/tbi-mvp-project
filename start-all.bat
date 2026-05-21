@echo off
echo ========================================
echo TBI-MVP - Full Stack Startup Script
echo ========================================
echo.

REM Start Frontend (Port 5173) in new window
start cmd /c "cd C:/Users/nghil/Projects/Hermes/tbi-mvp-project/frontend && npm run dev"

echo Frontend server starting on port 5173...

REM Wait for frontend to start
timeout /t 2 /nobreak >nul

REM Start Admin Portal (Port 5174) in new window
start cmd /c "cd C:/Users/nghil/Projects/Hermes/tbi-mvp-project/frontend-admin && npm run dev"

echo.
echo ========================================
echo ✅ Both servers starting...
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Admin Portal: http://localhost:5174
echo API Docs: http://localhost:8000/docs
echo.
echo Click each window when it shows "ready in XX ms"
echo ========================================
