@echo off

echo Installing application dependencies...
call npm install --loglevel=silent --no-audit --no-fund

if %errorlevel% neq 0 (
    echo Error installing application dependencies.
    pause
    exit /b %errorlevel%
)

echo Building application...
call npm run make

if %errorlevel% neq 0 (
    echo Error building application.
    pause
    exit /b %errorlevel%
)