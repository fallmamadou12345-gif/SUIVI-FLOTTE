@echo off
echo ==========================================
echo Installation de l'application Flotte...
echo ==========================================
echo.
echo Installation des dependances (cela peut prendre quelques minutes)...
call npm install
echo.
echo Compilation de l'application...
call npm run build
echo.
echo ==========================================
echo Installation terminee avec succes !
echo Vous pouvez maintenant lancer start.bat
echo ==========================================
pause
