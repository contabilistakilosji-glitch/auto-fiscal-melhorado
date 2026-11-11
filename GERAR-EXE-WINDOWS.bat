@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul || (echo Instale Node.js LTS: https://nodejs.org/ & pause & exit /b 1)
if not exist node_modules (echo Instalando dependencias... & call npm install || (pause & exit /b 1))
echo Gerando instalador e versao portatil do AutoFiscal RPA...
call npm run dist:win
if errorlevel 1 (echo Falha na compilacao. Consulte as mensagens acima. & pause & exit /b 1)
echo.
echo Arquivos gerados na pasta release.
explorer "%CD%\release"
pause
