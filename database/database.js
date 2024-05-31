const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool({
  user: 'dbnamecse340', // Updated with the actual database username
  host: 'dpg-cospjtacn0vc73eofd0g-a', // Updated with the actual database hostname
  database: 'dbnamecse340', // Update this with your actual database name
  password: 'Ayp9XzEdFdnEkJy2nI3I6ymyjnwLbbPG', // Update this with your actual database password
  port: 5432, // Change if your database is running on a different port
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
