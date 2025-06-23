#!/bin/sh

echo ""
echo "🏎️  BoxBox F1 Driver Rating System"
echo "=================================="
echo ""
echo "✅ Frontend container is ready!"
echo ""
echo "🌐 Application URLs:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:8000"
echo ""
echo "📝 Container Info:"
echo "   - Container: boxbox-frontend"
echo "   - Port: 80 (mapped to 3000)"
echo "   - Nginx serving React app"
echo ""
echo "🚀 Starting nginx..."
echo ""

# Start nginx
nginx -g "daemon off;"
