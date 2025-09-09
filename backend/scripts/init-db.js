const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Create database directory if it doesn't exist
const dbDir = path.join(__dirname, '../../database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Connect to database
const db = new sqlite3.Database('./database/fitzer.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Read and execute schema
const schemaPath = path.join(__dirname, '../../database/schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

db.exec(schema, (err) => {
  if (err) {
    console.error('Error creating tables:', err.message);
    process.exit(1);
  } else {
    console.log('Database tables created successfully');
    
    // Insert some sample data
    insertSampleData();
  }
});

function insertSampleData() {
  // Insert sample user
  db.run(`INSERT OR IGNORE INTO users (name, username, email) VALUES (?, ?, ?)`, 
    ['Code Busters', 'codebusters', 'codebusters@example.com'], function(err) {
    if (err) {
      console.error('Error inserting sample user:', err.message);
    } else {
      console.log('Sample user created with ID:', this.lastID);
      
      // Insert sample BMI data
      const userId = this.lastID;
      db.run(`INSERT OR IGNORE INTO bmi_data (user_id, height_cm, weight_kg, age, bmi, category) VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, 175, 70, 25, 22.9, 'Normal'], function(err) {
        if (err) {
          console.error('Error inserting sample BMI data:', err.message);
        } else {
          console.log('Sample BMI data created');
        }
      });

      // Insert sample weight history
      const weights = [72, 71.5, 71, 70.5, 70];
      weights.forEach((weight, index) => {
        const date = new Date();
        date.setDate(date.getDate() - (weights.length - index - 1));
        
        db.run(`INSERT OR IGNORE INTO weight_history (user_id, weight_kg, recorded_at) VALUES (?, ?, ?)`,
          [userId, weight, date.toISOString()]);
      });

      // Insert sample modules
      const modules = [
        { name: 'Workouts', completed: 3, total: 10 },
        { name: 'Diet Plans', completed: 2, total: 8 },
        { name: 'AI Assistant', completed: 4, total: 12 },
        { name: 'Trainers', completed: 1, total: 6 }
      ];

      modules.forEach(module => {
        db.run(`INSERT OR IGNORE INTO user_modules (user_id, module_name, completed, total) VALUES (?, ?, ?, ?)`,
          [userId, module.name, module.completed, module.total]);
      });

      // Insert user preferences
      db.run(`INSERT OR IGNORE INTO user_preferences (user_id, theme) VALUES (?, ?)`,
        [userId, 'light'], function(err) {
        if (err) {
          console.error('Error inserting user preferences:', err.message);
        } else {
          console.log('Sample data inserted successfully');
          db.close();
        }
      });
    }
  });
}
