/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const env = require("dotenv").config();
const cookieParser = require('cookie-parser');
const app = express();
const static = require("./route/static");
const accountRoutes = require('./route/accountRoutes'); // Added import statement
const inventoryRoutes = require('./route/inventoryRoutes');

/* ***********************
 * Middleware
 *************************/
// Middleware to parse JSON and url-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ***********************
 * Routes
 *************************/
app.use(static);
app.use(accountRoutes); // Add account routes
app.use('/inv', inventoryRoutes); // Ensure inventory routes are prefixed with '/inv'

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 5500;
const host = process.env.HOST || 'localhost';

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});
