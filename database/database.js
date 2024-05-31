const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool({
  user: 'your_database_user',
  host: 'your_database_host',
  database: 'your_database_name',
  password: 'your_database_password',
  port: 5432, // Change if your database is running on a different port
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
