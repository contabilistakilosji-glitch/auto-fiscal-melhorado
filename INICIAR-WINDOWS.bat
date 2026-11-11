@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo AutoFiscal RPA - Inicialização para desenvolvimento
echo.
where node >nul 2>nul || (echo Node.js nao encontrado. Instale a versao LTS em https://nodejs.org/ & pause & exit /b 1)
if not exist node_modules (echo Instalando dependencias... & call npm install || (pause & exit /b 1))
call npm run dev
pause
