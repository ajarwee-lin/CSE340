const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to account management view
router.get('/account-management', authMiddleware.verifyToken, accountController.accountManagementView);

// Route to update account view
router.get('/account/update/:id', authMiddleware.verifyToken, accountController.updateAccountView);

// Route to handle account updates
router.post('/account/update', authMiddleware.verifyToken, accountController.updateAccount);

// Route to handle password changes
router.post('/account/change-password', authMiddleware.verifyToken, accountController.changePassword);

// Route to handle logout
router.get('/logout', authMiddleware.verifyToken, accountController.logout);

module.exports = router;
