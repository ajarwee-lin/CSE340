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
const accountModel = require('./models/accountModel'); // Include accountModel
const bcrypt = require('bcrypt');
const app = express();
const static = require("./routes/static");
const accountRoutes = require('./routes/accountRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

/* ***********************
 * Middleware
 *************************/
// Middleware to parse JSON and url-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ***********************
 * Account Controller
 *************************/
// Account Management View
exports.accountManagementView = (req, res) => {
  res.render('accountManagement', { user: req.user });
};

// Update Account View
exports.updateAccountView = async (req, res) => {
  const user = await accountModel.getAccountById(req.params.id);
  res.render('updateAccount', { user });
};

// Update Account
exports.updateAccount = async (req, res) => {
  const { account_id, first_name, last_name, email } = req.body;
  try {
    await accountModel.updateAccount({ account_id, first_name, last_name, email });
    res.redirect('/account-management');
  } catch (error) {
    res.status(500).send('Error updating account: ' + error.message);
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  const { account_id, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await accountModel.updatePassword(account_id, hashedPassword);
    res.redirect('/account-management');
  } catch (error) {
    res.status(500).send('Error changing password: ' + error.message);
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};

/* ***********************
 * Routes
 *************************/
app.use(static);
app.use(accountRoutes);
app.use('/inv', inventoryRoutes);

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
