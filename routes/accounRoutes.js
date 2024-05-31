const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/account-management', authMiddleware.verifyToken, accountController.accountManagementView);
router.get('/account/update/:id', authMiddleware.verifyToken, accountController.updateAccountView);
router.post('/account/update', authMiddleware.verifyToken, accountController.updateAccount);
router.post('/account/change-password', authMiddleware.verifyToken, accountController.changePassword);
router.get('/logout', authMiddleware.verifyToken, accountController.logout);

module.exports = router;
