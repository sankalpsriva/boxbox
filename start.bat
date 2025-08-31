@echo off
echo.
echo 🏎️  BoxBox
echo ==================================
echo.
echo 🚀 Starting Docker containers...
echo.

docker-compose up -d

echo.
echo ✅ All containers are starting up!
echo.
echo 🌐 Application URLs:
echo    - Frontend: http://localhost:3000
echo    - Backend API: http://localhost:8000
echo    - Database: localhost:5432
echo.
echo 📝 Container Status:
docker-compose ps
echo.
echo 📊 To view logs:
echo    docker-compose logs -f
echo.
echo 🛑 To stop:
echo    docker-compose down
echo.
pause
