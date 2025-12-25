@echo off
cd backend
set PYTHONUTF8=1
python -m uvicorn phishguard.api.app:app --reload
pause
