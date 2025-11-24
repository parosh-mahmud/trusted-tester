@echo off
REM Trusted Tester - HTTP Server Startup Script (Windows)
REM This script starts a local web server for testing

echo.
echo 🚀 Starting Trusted Tester HTTP Server...
echo.
echo The tool REQUIRES an HTTP server to work properly.
echo Opening browser at http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM Try to open browser
start http://localhost:8000

REM Start Python HTTP server
python -m http.server 8000 2>nul
if %ERRORLEVEL% NEQ 0 (
    python3 -m http.server 8000 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ❌ Error: Python is not installed
        echo.
        echo Install Python from https://python.org
        echo Or use an alternative:
        echo   • VS Code: Install 'Live Server' extension
        echo   • Node.js: Run 'npx http-server'
        pause
        exit /b 1
    )
)
