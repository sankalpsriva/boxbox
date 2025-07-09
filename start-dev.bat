@echo off
echo.
echo BoxBox - DEVELOPMENT MODE
echo ====================================================
echo.
echo Starting development containers with HOT RELOAD...
echo.

docker-compose --profile dev up -d

echo.
echo Development containers are starting up!
echo.
echo Application URLs:
echo    - Frontend (DEV + Hot Reload): http://localhost:3001
echo    - Frontend (Production): http://localhost:3000
echo    - Backend API: http://localhost:8000
echo    - Database: localhost:5432
echo.
echo Development Features:
echo    - ✅ Hot reload enabled on port 3001
echo    - ✅ File changes auto-refresh browser
echo    - ✅ Source maps for debugging
echo    - ✅ Fast development builds
echo.
echo To view logs:
echo    docker-compose --profile dev logs -f
echo.
echo To restart dev frontend:
echo    docker-compose restart frontend-dev
echo.
echo To stop:
echo    docker-compose --profile dev down
echo.
pause
