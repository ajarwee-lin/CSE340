const express = require("express");
const env = require("dotenv").config();
const cookieParser = require('cookie-parser');
const app = express();
const static = require("./routes/static");
const accountRoutes = require('./routes/accountRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(static);
app.use(accountRoutes);
app.use('/inv', inventoryRoutes);

// Local Server Information
const port = process.env.PORT || 5500;
const host = process.env.HOST || 'localhost';

// Log statement to confirm server operation
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});
