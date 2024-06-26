const accountModel = require('../models/accountModel');
const bcrypt = require('bcrypt');

exports.accountManagementView = (req, res) => {
  res.render('accountManagement', { user: req.user });
};

exports.updateAccountView = async (req, res) => {
  try {
    const user = await accountModel.getAccountById(req.params.id);
    res.render('updateAccount', { user });
  } catch (error) {
    res.status(500).send('Error fetching account details: ' + error.message);
  }
};

exports.updateAccount = async (req, res) => {
  const { account_id, first_name, last_name, email } = req.body;
  try {
    await accountModel.updateAccount({ account_id, first_name, last_name, email });
    res.redirect('/account-management');
  } catch (error) {
    res.status(500).send('Error updating account: ' + error.message);
  }
};

exports.changePassword = async (req, res) => {
  const { account_id, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await accountModel.updatePassword(account_id, hashedPassword);
    res.redirect('/account-management');
  } catch (error) {
    res.status(500).send('Error changing password: ' + error.message);
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};
