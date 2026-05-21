@echo off
echo ========================================
echo TBI-MVP Frontend - Quick Restart Script
echo ========================================
echo.

cd /d %~dp0
echo Stopping current server...
echo.

echo Clearing cache...
npm cache clean --force
echo Done.

echo Removing node_modules...
if exist node_modules rmdir /s /q node_modules
echo Done.

echo Installing dependencies...
call npm install
echo Done.

echo Starting dev server...
call npm run dev
pause
