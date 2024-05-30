const invModel = require('../models/invModel')
const util = require('../utilities/index')

// Management view
exports.managementView = async (req, res) => {
  res.render('inventory/management', { title: 'Inventory Management' })
}

// View to add a classification
exports.addClassificationView = async (req, res) => {
  res.render('inventory/add-classification', { title: 'Add Classification' })
}

// Handle adding a classification
exports.addClassification = async (req, res) => {
  const { classification_name } = req.body
  try {
    await invModel.addClassification(classification_name)
    res.redirect('/inv/')
  } catch (error) {
    res.status(500).send('Error adding classification: ' + error.message)
  }
}

// View to add inventory
exports.addInventoryView = async (req, res) => {
  const classificationList = await util.buildClassificationList()
  res.render('inventory/add-inventory', { 
    title: 'Add Inventory', 
    classificationList 
  })
}

// Handle adding inventory
exports.addInventory = async (req, res) => {
  const { inv_make, inv_model, inv_description, inv_price, inv_year, inv_miles, inv_color, classification_id } = req.body
  try {
    await invModel.addInventory({ inv_make, inv_model, inv_description, inv_price, inv_year, inv_miles, inv_color, classification_id })
    res.redirect('/inv/')
  } catch (error) {
    res.status(500).send('Error adding inventory: ' + error.message)
  }
}
