@echo off
echo ===========================================
echo   FIXING MISSING MODULES (Express, etc.)
echo ===========================================
echo.
echo 1. Entering 'server' folder...
cd server
echo.
echo 2. Installing backend dependencies...
call npm install
echo.
echo 3. Dependencies installed!
echo.
echo ===========================================
echo   STARTING BACKEND SERVER
echo ===========================================
call npm run dev
pause
