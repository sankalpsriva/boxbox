#!/bin/sh

echo ""
echo "🏎️  BoxBox F1 Driver Rating System - Backend"
echo "============================================="
echo ""
echo "✅ Backend container is ready!"
echo ""
echo "🌐 Application URLs:"
echo "   - Backend API: http://localhost:8000"
echo "   - Frontend: http://localhost:3000"
echo ""
echo "📝 Container Info:"
echo "   - Container: boxbox-backend"
echo "   - Port: 8000"
echo "   - FastAPI with PostgreSQL"
echo ""
echo "🚀 Starting FastAPI server..."
echo ""

# Start the FastAPI server
uvicorn app.main:app --host 0.0.0.0 --port 8000
