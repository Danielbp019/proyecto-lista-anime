@echo off
REM Obtener la ruta del directorio donde se encuentra el batch
set SCRIPT_DIR=%~dp0

REM Cambiar al directorio del proyecto
cd /d "%SCRIPT_DIR%"

REM Ejecutar el comando Laravel php artisan serve
start cmd /k "php artisan serve"