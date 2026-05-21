@echo off
REM ============================================
REM TBI-MVP Quick Start - Simple Version
REM Just run this once to get everything started
REM ============================================

echo.
echo ============================================
echo   TBI Employment Pathways MVP - Quick Setup
echo ============================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not installed!
    echo Please install Node.js v18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python not installed!
    echo Please install Python 3.9+ from https://www.python.org/
    pause
    exit /b 1
)

echo.
echo Setup complete! Ready to start servers...
echo.
echo To start all servers, run: start-all.bat
echo.
echo Or run them separately:
echo   1. Backend: cd backend && venv_backend\Scripts\activate && python -m uvicorn app.main:app --reload
echo   2. Frontend: cd frontend && npm run dev
echo   3. Admin:   cd frontend-admin && npm run dev
echo.

pause
