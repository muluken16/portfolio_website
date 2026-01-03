@echo off
TITLE Portfolio Full-Stack Launcher
COLOR 0A
CLS

ECHO ===================================================
ECHO   🚀 Portfolio Website - Full Stack Launcher
ECHO ===================================================
ECHO.
ECHO   Checking environment...
ECHO.

IF EXIST node_modules (
    ECHO   [OK] Frontend modules found
) ELSE (
    ECHO   [INFO] Installing Frontend dependencies...
    call npm install
)

IF EXIST server\node_modules (
    ECHO   [OK] Backend modules found
) ELSE (
    ECHO   [INFO] Installing Backend dependencies...
    cd server
    call npm install
    cd ..
)

ECHO.
ECHO   -----------------------------------------
ECHO   🔥 Starting BOTH Servers (Front & Back)
ECHO   -----------------------------------------
ECHO.
ECHO   You should see:
ECHO     [0] VITE ...
ECHO     [1] Server running on port 5000 ...
ECHO.
ECHO   Usage:
ECHO     - Frontend: http://localhost:5173
ECHO     - Backend:  http://localhost:5000
ECHO.

call npm run dev:all

PAUSE
