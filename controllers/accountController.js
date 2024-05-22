// controllers/accountController.js
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../models/db');

exports.showUpdateForm = (req, res) => {
  res.render('account/update', { user: res.locals.user });
};

exports.updateAccount = [
  // Validation
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  check('email').isEmail().withMessage('Invalid email'),

  // Update logic
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('account/update', { errors: errors.array(), user: req.body });
    }

    const { firstName, lastName, email, account_id } = req.body;
    try {
      await db.updateAccount(account_id, { firstName, lastName, email });
      res.redirect('/account');
    } catch (err) {
      res.render('account/update', { errors: [{ msg: err.message }], user: req.body });
    }
  },
];

exports.changePassword = [
  check('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('account/update', { errors: errors.array(), user: res.locals.user });
    }

    const { newPassword, account_id } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.changePassword(account_id, hashedPassword);
      res.redirect('/account');
    } catch (err) {
      res.render('account/update', { errors: [{ msg: err.message }], user: res.locals.user });
    }
  },
];
