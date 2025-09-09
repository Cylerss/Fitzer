const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Database connection
const db = new sqlite3.Database('./database/fitzer.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Initialize database tables
const initDatabase = () => {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const schema = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf8');
    db.exec(schema, (err) => {
      if (err) {
        console.error('Error creating tables:', err.message);
      } else {
        console.log('Database tables created successfully');
      }
    });
  } catch (error) {
    console.error('Error reading schema file:', error.message);
  }
};

// Initialize database on startup
initDatabase();

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Fitzer API is running' });
});

// User registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username) {
      return res.status(400).json({ error: 'Name and username are required' });
    }

    // Check if username already exists
    db.get('SELECT id FROM users WHERE username = ?', [username], async (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (row) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Create user (without password for now, since current app doesn't use passwords)
      const stmt = db.prepare('INSERT INTO users (name, username, email) VALUES (?, ?, ?)');
      stmt.run([name, username, email], function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to create user' });
        }

        const userId = this.lastID;
        const token = jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: '7d' });

        // Initialize user preferences
        db.run('INSERT INTO user_preferences (user_id, theme) VALUES (?, ?)', [userId, 'light']);

        res.json({
          message: 'User created successfully',
          token,
          user: { id: userId, name, username, email }
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// User login (simplified for current app structure)
app.post('/api/auth/login', (req, res) => {
  try {
    const { name, username } = req.body;

    if (!name || !username) {
      return res.status(400).json({ error: 'Name and username are required' });
    }

    // Check if user exists, if not create them
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!user) {
        // Create new user
        const stmt = db.prepare('INSERT INTO users (name, username) VALUES (?, ?)');
        stmt.run([name, username], function(err) {
          if (err) {
            return res.status(500).json({ error: 'Failed to create user' });
          }

          const userId = this.lastID;
          const token = jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: '7d' });

          // Initialize user preferences
          db.run('INSERT INTO user_preferences (user_id, theme) VALUES (?, ?)', [userId, 'light']);

          res.json({
            message: 'User created and logged in',
            token,
            user: { id: userId, name, username }
          });
        });
      } else {
        // Update name if different
        if (user.name !== name) {
          db.run('UPDATE users SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [name, user.id]);
        }

        const token = jwt.sign({ userId: user.id, username }, JWT_SECRET, { expiresIn: '7d' });
        res.json({
          message: 'Login successful',
          token,
          user: { id: user.id, name, username, email: user.email }
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user profile
app.get('/api/user/profile', authenticateToken, (req, res) => {
  db.get('SELECT * FROM users WHERE id = ?', [req.user.userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: { id: user.id, name: user.name, username: user.username, email: user.email } });
  });
});

// Save BMI data
app.post('/api/bmi', authenticateToken, (req, res) => {
  try {
    const { heightCm, weightKg, age, bmi, category } = req.body;

    if (!heightCm || !weightKg || !age || !bmi) {
      return res.status(400).json({ error: 'All BMI fields are required' });
    }

    const stmt = db.prepare('INSERT INTO bmi_data (user_id, height_cm, weight_kg, age, bmi, category) VALUES (?, ?, ?, ?, ?, ?)');
    stmt.run([req.user.userId, heightCm, weightKg, age, bmi, category], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to save BMI data' });
      }

      // Also save to weight history
      const weightStmt = db.prepare('INSERT INTO weight_history (user_id, weight_kg) VALUES (?, ?)');
      weightStmt.run([req.user.userId, weightKg]);

      res.json({ message: 'BMI data saved successfully', id: this.lastID });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get BMI data
app.get('/api/bmi', authenticateToken, (req, res) => {
  db.get('SELECT * FROM bmi_data WHERE user_id = ? ORDER BY created_at DESC LIMIT 1', [req.user.userId], (err, bmiData) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ bmiData: bmiData || {} });
  });
});

// Get weight history
app.get('/api/weight-history', authenticateToken, (req, res) => {
  db.all('SELECT * FROM weight_history WHERE user_id = ? ORDER BY recorded_at DESC LIMIT 24', [req.user.userId], (err, history) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ history: history || [] });
  });
});

// Save diet plan
app.post('/api/diet-plan', authenticateToken, (req, res) => {
  try {
    const { dietType, category, items } = req.body;

    if (!dietType || !category || !items) {
      return res.status(400).json({ error: 'All diet plan fields are required' });
    }

    // Delete existing diet plan for user
    db.run('DELETE FROM diet_plans WHERE user_id = ?', [req.user.userId], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      // Insert new diet plan
      const stmt = db.prepare('INSERT INTO diet_plans (user_id, diet_type, category, items) VALUES (?, ?, ?, ?)');
      stmt.run([req.user.userId, dietType, category, JSON.stringify(items)], function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to save diet plan' });
        }
        res.json({ message: 'Diet plan saved successfully', id: this.lastID });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get diet plan
app.get('/api/diet-plan', authenticateToken, (req, res) => {
  db.get('SELECT * FROM diet_plans WHERE user_id = ? ORDER BY created_at DESC LIMIT 1', [req.user.userId], (err, dietPlan) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (dietPlan) {
      dietPlan.items = JSON.parse(dietPlan.items);
    }
    res.json({ dietPlan: dietPlan || null });
  });
});

// Save user modules progress
app.post('/api/modules', authenticateToken, (req, res) => {
  try {
    const { modules } = req.body;

    if (!Array.isArray(modules)) {
      return res.status(400).json({ error: 'Modules must be an array' });
    }

    // Clear existing modules for user
    db.run('DELETE FROM user_modules WHERE user_id = ?', [req.user.userId], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      // Insert new modules
      const stmt = db.prepare('INSERT INTO user_modules (user_id, module_name, completed, total) VALUES (?, ?, ?, ?)');
      modules.forEach(module => {
        stmt.run([req.user.userId, module.label, module.completed, module.total]);
      });

      res.json({ message: 'Modules saved successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user modules
app.get('/api/modules', authenticateToken, (req, res) => {
  db.all('SELECT * FROM user_modules WHERE user_id = ?', [req.user.userId], (err, modules) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    const formattedModules = modules.map(module => ({
      label: module.module_name,
      completed: module.completed,
      total: module.total
    }));

    res.json({ modules: formattedModules });
  });
});

// Update user preferences
app.put('/api/preferences', authenticateToken, (req, res) => {
  try {
    const { theme } = req.body;

    db.run('UPDATE user_preferences SET theme = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?', [theme, req.user.userId], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Preferences updated successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user preferences
app.get('/api/preferences', authenticateToken, (req, res) => {
  db.get('SELECT * FROM user_preferences WHERE user_id = ?', [req.user.userId], (err, preferences) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ preferences: preferences || { theme: 'light' } });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Fitzer API server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});
