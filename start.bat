@echo off
REM ============================================
REM TBI-MVP Auto-Start Script
REM Launches both Backend API and Frontend app
REM ============================================

cd /d "%~dp0"
echo [TBI-MVP] Starting application...
echo.

REM Check if back end virtual environment exists
if not exist "backend\venv_backend" (
    echo [ERROR] Backend virtual environment not found!
    echo Please run: python -m venv backend\venv_backend
    pause
    exit /b 1
)

REM Check if frontend node_modules exists
if not exist "frontend\node_modules" (
    echo [INFO] Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo ============================================
echo Starting Backend API on port 8000...
echo ============================================
start cmd /k "cd backend && call venv_backend\Scripts\activate.bat && python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

timeout /t 2 /nobreak >nul

echo.
echo ============================================
echo Starting Frontend on port 5173...
echo ============================================
start cmd /k "cd frontend && npm run dev"

echo.
echo ============================================
echo TBI-MVP Application starting...
echo Backend: http://localhost:8000/docs
echo Frontend: http://localhost:5173
echo ============================================
echo.
pause
