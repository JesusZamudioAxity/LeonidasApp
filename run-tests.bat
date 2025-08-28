@echo off
SET EMULATOR_NAME=Pixel_3a
echo Iniciando emulador %EMULATOR_NAME%...
start "" "%ANDROID_SDK_ROOT%\emulator\emulator.exe" -avd %EMULATOR_NAME%

echo Esperando que el emulador esté disponible...
:wait_for_device
for /f %%i in ('%ANDROID_SDK_ROOT%\platform-tools\adb.exe shell getprop sys.boot_completed') do (
    if "%%i"=="1" goto device_ready
)
timeout /t 5 >nul
goto wait_for_device

:device_ready
echo Emulador listo. Ejecutando pruebas...
npx wdio run wdio.conf.js
pause
