# BoxBox F1 Race Rating Platform - Developer Guide 🏎️

A comprehensive F1 race rating platform built with React (frontend) and FastAPI (backend).

## 📋 **Table of Contents**

- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Prerequisites](#️-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Development Workflow](#-development-workflow)
- [API Documentation](#-api-documentation)
- [Frontend Development](#-frontend-development)
- [Backend Development](#️-backend-development)
- [Database Management](#️-database-management)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Deployment](#-deployment)

## 🚀 **Quick Start**

```bash
# 1. Clone the repository
git clone <repository-url>
cd boxbox

# 2. Start development environment
docker-compose --profile dev up -d

# 3. Access the application
# Frontend: http://localhost:3001 (with hot reload)
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

## 📁 **Project Structure**

```
boxbox/
├── frontend/                 # React + Tailwind CSS frontend
│   ├── src/
│   │   ├── pages/           # React pages (Home, Races, Login, etc.)
│   │   ├── contexts/        # React contexts (AuthContext)
│   │   └── components/      # Reusable React components
│   ├── public/             # Static assets
│   ├── package.json        # Node.js dependencies
│   └── Dockerfile          # Frontend container config
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/v1/routes/  # API route handlers
│   │   ├── db/             # Database configuration
│   │   ├── crud/           # Database operations
│   │   └── main.py         # FastAPI app entry point
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile          # Backend container config
├── docker-compose.yml      # Container orchestration
├── .gitignore             # Git ignore rules
└── README.md              # Main documentation
```

## 🛠️ **Prerequisites**

### **Required Software:**
- **Docker Desktop** (v20.10+)
- **Docker Compose** (v2.0+)
- **Git** (v2.30+)

### **Optional (for local development):**
- **Node.js** (v18+) - for running frontend locally
- **Python** (v3.11+) - for running backend locally
- **PostgreSQL** (v13+) - for local database

### **Verify Installation:**
```bash
docker --version          # Should show 20.10+
docker-compose --version  # Should show 2.0+
git --version            # Should show 2.30+
```

## 📦 **Installation & Setup**

### **1. Clone Repository**
```bash
git clone <repository-url>
cd boxbox
```

### **3. Build and Start Services**
```bash
# Development mode (with hot reload)
docker-compose --profile dev up -d

# Production mode
docker-compose up -d

# Build without cache (if issues)
docker-compose build --no-cache
docker-compose --profile dev up -d
```

### **4. Verify Setup**
```bash
# Check all containers are running
docker-compose ps

# Should see:
# - frontend-dev (if dev profile)
# - backend
# - db
```

## 🔄 **Development Workflow**

### **Daily Development Process:**

1. **Start Development Environment:**
   ```bash
   docker-compose --profile dev up -d
   ```

2. **Make Code Changes:**
   - Frontend changes auto-reload at http://localhost:3001
   - Backend changes require restart (see rebuild scripts below)

3. **View Logs:**
   ```bash
   # All services
   docker-compose logs -f
   
   # Specific service
   docker-compose logs -f backend
   docker-compose logs -f frontend-dev
   ```

4. **Stop Development:**
   ```bash
   docker-compose down
   ```

### **Backend Rebuild (After Code Changes):**

#### **Quick Rebuild:**
```bash
docker-compose restart backend
```

#### **Full Rebuild:**
```bash
docker-compose down
docker-compose build backend
docker-compose --profile dev up -d
```

#### **Using Rebuild Script (Windows):**
```bash
# Save as rebuild-backend.bat
@echo off
echo Rebuilding backend...
docker-compose stop backend
docker-compose build backend
docker-compose start backend
echo Backend rebuilt!
docker-compose logs --tail=10 backend
```

## 📚 **API Documentation**

### **Available Endpoints:**

#### **Races API:**
- `GET /api/v1/races?year=2024` - Get races for specific year
- `GET /api/v1/races/top` - Get top-rated races
- `GET /api/v1/races/top?limit=5` - Get top N races

#### **Drivers API:**
- `GET /api/v1/drivers/top` - Get top drivers

#### **Testing Endpoints:**
- `GET /health` - Health check
- `GET /api/v1/races/test` - API connectivity test

### **API Documentation:**
- **Interactive Docs:** http://localhost:8000/docs
- **OpenAPI Schema:** http://localhost:8000/openapi.json

### **Example API Calls:**
```bash
# Test backend connectivity
curl http://localhost:8000/health

# Get races for 2024
curl http://localhost:8000/api/v1/races?year=2024

# Get top 5 races
curl http://localhost:8000/api/v1/races/top?limit=5
```

## 🎨 **Frontend Development**

### **Tech Stack:**
- **React** (v18+)
- **React Router** (client-side routing)
- **Tailwind CSS** (styling)
- **Axios** (HTTP client)

### **Development Server:**
```bash
# Hot reload development (recommended)
docker-compose --profile dev up -d
# Access: http://localhost:3001

# OR run locally (if Node.js installed)
cd frontend
npm install
npm start
# Access: http://localhost:3000
```

### **Key Frontend Files:**
```
frontend/src/
├── pages/
│   ├── Home.js          # Dashboard with top races
│   ├── Races.js         # Race filtering and display
│   ├── Login.js         # Authentication page
│   ├── Seasons.js       # Season browser
│   └── Drivers.js       # Driver statistics
├── contexts/
│   └── AuthContext.js   # Authentication state
└── App.js               # Main app component
```

### **Adding New Pages:**
1. Create component in `frontend/src/pages`
2. Add route in `frontend/src/App.js`
3. Add navigation in page headers

### **Styling Guidelines:**
- Use **Tailwind CSS** classes
- Follow **dark theme** (bg-black, text-white)
- Use **red accents** for F1 branding (text-red-500, bg-red-600)
- Maintain **responsive design** (grid, md:, lg: breakpoints)

## ⚙️ **Backend Development**

### **Tech Stack:**
- **FastAPI** (Python web framework)
- **SQLAlchemy** (ORM)
- **PostgreSQL** (database)
- **FastF1** (F1 data API)

### **Development Setup:**
```bash
# Run with hot reload (recommended)
docker-compose --profile dev up -d

# OR run locally (if Python installed)
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### **Adding New API Endpoints:**

1. **Create route file:**
   ```python
   # backend/app/api/v1/routes/new_feature.py
   from fastapi import APIRouter, Depends
   from sqlalchemy.orm import Session
   from app.db.session import get_db
   
   router = APIRouter()
   
   @router.get("/new-endpoint")
   def get_data(db: Session = Depends(get_db)):
       return {"message": "Hello World"}
   ```

2. **Register router:**
   ```python
   # backend/app/api/v1/api.py
   from app.api.v1.routes import new_feature
   
   api_router.include_router(new_feature.router, tags=["new-feature"])
   ```

### **Database Operations:**
```python
# Example CRUD operations
from sqlalchemy.orm import Session

def create_race(db: Session, race_data: dict):
    # Create new race
    pass

def get_races_by_year(db: Session, year: int):
    # Query races
    pass
```

### **Database Access:**
```bash
# Connect to PostgreSQL container
docker-compose exec db psql -U user -d boxbox

# View tables
\dt

# Query races
SELECT * FROM races LIMIT 5;
```

### **Database Migrations:**
```bash
# Reset database (development only)
docker-compose down -v
docker-compose up -d

# Backup database
docker-compose exec db pg_dump -U user boxbox > backup.sql

# Restore database
docker-compose exec -T db psql -U user boxbox < backup.sql
```

### **Database Schema:**
```sql
-- Example tables (to be implemented)
CREATE TABLE races (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    year INTEGER,
    date DATE,
    circuit VARCHAR(255),
    avg_rating DECIMAL(3,2),
    total_ratings INTEGER
);

CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    team VARCHAR(255),
    points INTEGER
);
```

## 🧪 **Testing**

### **Manual Testing:**
```bash
# Test frontend
# 1. Visit http://localhost:3001
# 2. Navigate between pages
# 3. Test year filtering on races page
# 4. Test login/logout functionality

# Test backend
curl http://localhost:8000/health
curl http://localhost:8000/api/v1/races
curl http://localhost:8000/api/v1/races?year=2024
```

### **Automated Testing (Future):**
```bash
# Frontend tests (to be implemented)
cd frontend
npm test

# Backend tests (to be implemented)
cd backend
pytest
```

## 🐛 **Troubleshooting**

### **Common Issues:**

#### **1. Containers Won't Start:**
```bash
# Check Docker is running
docker info

# Check port conflicts
netstat -tulpn | grep :3001
netstat -tulpn | grep :8000

# Reset everything
docker-compose down -v
docker system prune -a
docker-compose --profile dev up -d --build
```

#### **2. Backend API Returns 404:**
```bash
# Check backend logs
docker-compose logs backend

# Verify endpoints exist
curl http://localhost:8000/docs

# Rebuild backend
docker-compose build backend
docker-compose restart backend
```

#### **3. Frontend Can't Connect to Backend:**
```bash
# Check CORS settings in backend
# Check API base URL in frontend
# Verify both containers are running
docker-compose ps
```

#### **4. Database Connection Issues:**
```bash
# Check database logs
docker-compose logs db

# Reset database
docker-compose stop db
docker-compose rm db
docker-compose up -d db
```

### **Debug Commands:**
```bash
# View all logs
docker-compose logs -f

# Enter container shell
docker-compose exec backend bash
docker-compose exec frontend-dev bash

# Check container resources
docker stats

# View container configuration
docker-compose config
```

## 🤝 **Contributing**

### **Development Guidelines:**

1. **Branch Naming:**
   ```bash
   feature/races-filtering
   bugfix/api-404-error
   improvement/ui-responsiveness
   ```

2. **Commit Messages:** **IGNORE**
   ```bash
   feat: add race filtering by year
   fix: resolve API 404 error for races endpoint
   style: improve mobile responsiveness
   docs: update API documentation
   ```

3. **Pull Request Process:**
   - Create feature branch
   - Make changes
   - Test locally
   - Submit PR with description

### **Before Submitting:**
```bash
# 1. Test your changes
docker-compose --profile dev up -d
# Verify functionality works

# 2. Check logs for errors
docker-compose logs backend
docker-compose logs frontend-dev

# 3. Clean up
docker-compose down
```

## 🚀 **Deployment**

### **Production Build:**
```bash
# Build production images
docker-compose build

# Start production services
docker-compose up -d

# Production URLs:
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

### **Environment Variables (Production):**
```bash
# backend/.env.production
DEBUG=false
DATABASE_URL=postgresql://prod_user:prod_pass@prod_db:5432/boxbox_prod
SECRET_KEY=super-secret-production-key
CORS_ORIGINS=https://yourdomain.com
```

### **Deployment Platforms:**
- **Docker Swarm**
- **Kubernetes**
- **AWS ECS**
- **Google Cloud Run**
- **DigitalOcean App Platform**

## 📞 **Support**

### **Getting Help:**
1. Check this README
2. Review logs: `docker-compose logs -f`
3. Check API docs: http://localhost:8000/docs
4. Create GitHub issue

### **Useful Resources:**
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🏁 **Happy Coding!**

Welcome to the BoxBox F1 development team! This platform aims to be the ultimate destination for F1 race ratings and community engagement. Every contribution helps make the F1 community stronger! 🏎️✨