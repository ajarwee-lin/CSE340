const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/inventoryController')

// Route to management view
router.get('/', inventoryController.managementView)

// Routes for classification
router.get('/add-classification', inventoryController.addClassificationView)
router.post('/add-classification', inventoryController.addClassification)

// Routes for inventory
router.get('/add-inventory', inventoryController.addInventoryView)
router.post('/add-inventory', inventoryController.addInventory)

module.exports = router
