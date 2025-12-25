@echo off
set "VENV_PYTHON=..\.venv\Scripts\python.exe"
set "GLOBAL_PYTHON=python"

if exist "%VENV_PYTHON%" (
    echo [INFO] Found Virtual Environment.
    set "PYTHON_EXE=%VENV_PYTHON%"
) else (
    echo [INFO] No .venv found. Using Global Python.
    set "PYTHON_EXE=%GLOBAL_PYTHON%"
)

cd backend
set PYTHONUTF8=1

echo [INFO] Installing/Verifying dependencies with: "%PYTHON_EXE%"
"%PYTHON_EXE%" -m pip install -r requirements.txt

echo [INFO] Starting Server...
"%PYTHON_EXE%" -m uvicorn phishguard.api.app:app --reload
pause
