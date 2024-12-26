@echo off
REM Obtener la ruta del directorio donde se encuentra el batch
set SCRIPT_DIR=%~dp0

REM Cambiar al directorio del proyecto
cd /d "%SCRIPT_DIR%"

REM Ejecutar el comando
start cmd /k "npm run dev"
