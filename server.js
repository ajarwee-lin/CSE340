const express = require("express");
const env = require("dotenv").config();
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const morgan = require('morgan');
const staticRoutes = require("./routes/static");
const accountRoutes = require('./routes/accountRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

// Environment Variables Validation
if (!process.env.PORT || !process.env.HOST) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('tiny'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use(staticRoutes);
app.use(accountRoutes);
app.use('/inv', inventoryRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Local Server Information
const port = process.env.PORT || 5500;
const host = process.env.HOST || 'localhost';

// Log statement to confirm server operation
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`);
});
