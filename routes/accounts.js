// routes/account.js
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/update', accountController.showUpdateForm);
router.post('/update', accountController.updateAccount);
router.post('/change-password', accountController.changePassword);

module.exports = router;
