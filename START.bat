@echo off
echo ========================================
echo   Starting Portfolio - Full Stack
echo ========================================
echo.
echo Installing dependencies...
call npm install
echo.
echo Installing backend dependencies...
cd server
call npm install
cd ..
echo.
echo ========================================
echo   Starting Both Servers...
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo.
call npm run dev:all
