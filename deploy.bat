@echo off
echo ==========================================
echo    PHISHGUARD DEPLOYMENT SCRIPT 🚀
echo ==========================================

echo [1/3] Stopping existing PhishGuard containers...
docker stop phishguard-container >nul 2>&1
docker rm phishguard-container >nul 2>&1

echo [2/3] Building Docker Image (this may take a minute)...
docker build -t phishguard-app .

echo [3/3] Starting Container on Port 8000...
docker run -d -p 8000:8000 --name phishguard-container phishguard-app

echo.
echo ==========================================
echo    DEPLOYMENT SUCCESSFUL! ✅
echo ==========================================
echo App is running at: http://localhost:8000
echo.
pause
