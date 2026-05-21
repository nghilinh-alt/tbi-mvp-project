@echo off
REM ============================================
REM TBI-MVP Stop Script
REM Closes all processes related to TBI-MVP app
REM ============================================

echo [TBI-MVP] Stopping application...
echo.

echo Closing Backend API on port 8000...
taskkill /F /FI "WINDOWTITLE eq *uvicorn*" 2>nul

echo Closing Frontend (Vite) on port 5173...
taskkill /F /FI "WINDOWTITLE eq *vite*" 2>nul

echo.
echo ============================================
echo Cleaning up port 8000 and 5173...
echo ============================================
echo.

REM Wait a moment for ports to be released
timeout /t 2 /nobreak >nul

echo Done! You can now restart with start.bat
echo.
pause
