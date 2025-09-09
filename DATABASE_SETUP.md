# Fitzer Database Setup Guide

This guide will help you set up a database for the Fitzer fitness application, replacing the current localStorage implementation.

## 🗄️ Database Overview

The database includes the following tables:
- **users**: User accounts and profiles
- **bmi_data**: BMI calculations and measurements
- **weight_history**: Weight tracking over time
- **diet_plans**: AI-generated diet plans
- **user_modules**: Progress tracking for different modules
- **user_preferences**: User settings (theme, etc.)
- **exercise_recommendations**: Exercise suggestions based on BMI

## 🚀 Quick Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env file with your settings
# PORT=3001
# JWT_SECRET=your-super-secret-jwt-key
# FRONTEND_URL=http://localhost:5173

# Initialize database with sample data
npm run init-db

# Start the backend server
npm run dev
```

### 2. Frontend Setup

```bash
# In the main project directory
# Add API URL to your .env file
echo "VITE_API_URL=http://localhost:3001/api" >> .env

# Restart your frontend development server
npm run dev
```

## 📁 File Structure

```
├── backend/
│   ├── server.js              # Main API server
│   ├── package.json           # Backend dependencies
│   ├── env.example            # Environment variables template
│   └── scripts/
│       └── init-db.js         # Database initialization script
├── database/
│   ├── schema.sql             # Database schema
│   └── fitzer.db              # SQLite database file (created automatically)
└── src/
    └── services/
        └── api.js             # Frontend API service
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### User Data
- `GET /api/user/profile` - Get user profile
- `GET /api/bmi` - Get BMI data
- `POST /api/bmi` - Save BMI data
- `GET /api/weight-history` - Get weight history

### Diet Plans
- `GET /api/diet-plan` - Get diet plan
- `POST /api/diet-plan` - Save diet plan

### Modules & Preferences
- `GET /api/modules` - Get user modules
- `POST /api/modules` - Save modules progress
- `GET /api/preferences` - Get user preferences
- `PUT /api/preferences` - Update preferences

## 🔄 Migration from localStorage

The new API service (`src/services/api.js`) provides the same interface as localStorage but with database persistence. To migrate:

1. **Replace localStorage calls** with API calls
2. **Add authentication** to protected routes
3. **Handle loading states** for async operations
4. **Add error handling** for network requests

### Example Migration:

**Before (localStorage):**
```javascript
const user = JSON.parse(localStorage.getItem('fitzer.user') || '{}');
localStorage.setItem('fitzer.bmi', JSON.stringify(bmiData));
```

**After (API):**
```javascript
const { user } = await apiService.getUserProfile();
await apiService.saveBmiData(bmiData);
```

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents API abuse
- **CORS Protection**: Configurable cross-origin requests
- **Input Validation**: Server-side data validation
- **SQL Injection Protection**: Parameterized queries

## 🧪 Testing the Setup

1. **Start both servers**:
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend
   npm run dev
   ```

2. **Test API endpoints**:
   ```bash
   # Health check
   curl http://localhost:3001/api/health
   
   # Login
   curl -X POST http://localhost:3001/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"name":"Code Busters","username":"codebusters"}'
   ```

3. **Check database**:
   ```bash
   # Install sqlite3 CLI if not already installed
   sqlite3 database/fitzer.db
   .tables
   SELECT * FROM users;
   ```

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
PORT=3001
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key-change-in-production
DB_PATH=./database/fitzer.db
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:3001/api
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

## 🚨 Troubleshooting

### Common Issues:

1. **Database not found**: Run `npm run init-db` in backend directory
2. **CORS errors**: Check FRONTEND_URL in backend .env
3. **Authentication fails**: Verify JWT_SECRET is set
4. **API not responding**: Check if backend server is running on port 3001

### Database Reset:
```bash
cd backend
rm -f ../database/fitzer.db
npm run init-db
```

## 📈 Production Deployment

For production deployment:

1. **Use PostgreSQL/MySQL** instead of SQLite
2. **Set strong JWT_SECRET**
3. **Enable HTTPS**
4. **Configure proper CORS origins**
5. **Set up database backups**
6. **Use environment-specific configurations**

## 🤝 Contributing

When adding new features:

1. **Update database schema** in `database/schema.sql`
2. **Add API endpoints** in `backend/server.js`
3. **Update frontend service** in `src/services/api.js`
4. **Test with sample data** in `backend/scripts/init-db.js`

---

**Note**: This database setup provides a solid foundation for the Fitzer app. You can extend it with additional features like user authentication, social features, or advanced analytics as needed.
