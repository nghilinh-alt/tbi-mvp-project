@echo off
setlocal

echo ========================================
echo TBI-MVP Application Start Script
echo ========================================
echo.

REM Activate Python backend virtual environment
cd backend
call "venv_backend\Scripts\activate.bat" 2>nul || echo Backend venv not found at expected path
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
echo.
