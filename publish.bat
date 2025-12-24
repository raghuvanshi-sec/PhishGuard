@echo off
echo ==========================================
echo    PHISHGUARD PUBLISH SCRIPT 🚀
echo ==========================================

REM Set your actual Docker Hub username here
set USERNAME=raghuvanshi22
set IMAGE_NAME=phishguard

echo [1/2] Tagging image for Docker Hub...
docker tag phishguard-app %USERNAME%/%IMAGE_NAME%:latest

echo [2/2] Pushing to Docker Hub (this may take a while)...
docker push %USERNAME%/%IMAGE_NAME%:latest

echo.
echo ==========================================
echo    PUBLISH SUCCESSFUL! ✅
echo ==========================================
echo Your app is now live at:
echo https://hub.docker.com/r/%USERNAME%/%IMAGE_NAME%
echo.
pause
