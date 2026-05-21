@echo off
echo ========================================
echo TBI-MVP Server Restart Script
echo ========================================
echo.

echo [1] Stopping existing Node processes...
taskkill /IM node.exe /F 2>nul || echo No running Node processes found
timeout /t 2 >nul

echo [2] Starting Backend API on port 8000...
cd backend
.\venv_backend\Scripts\activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
cd ..
echo.
echo ========================================
echo BACKEND STOPPED - Press Ctrl+C to exit
