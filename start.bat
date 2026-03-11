@echo off
echo ==========================================
echo Lancement du Serveur Flotte...
echo ==========================================
echo.
echo Le serveur demarre sur le port 3000.
echo Ne fermez pas cette fenetre noire tant que vous utilisez l'application.
echo.
echo Pour y acceder depuis ce PC : http://localhost:3000
echo Pour y acceder depuis un autre PC du reseau : http://ADRESSE_IP_DE_CE_PC:3000
echo.
call npm start
pause
