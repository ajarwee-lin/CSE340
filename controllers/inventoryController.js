const invModel = require('../models/invModel');
const util = require('../utilities/index');

// Management view
exports.managementView = async (req, res) => {
  try {
    res.render('inventory/management', { title: 'Inventory Management' });
  } catch (error) {
    res.status(500).send('Error loading management view: ' + error.message);
  }
};

// View to add a classification
exports.addClassificationView = async (req, res) => {
  try {
    res.render('inventory/add-classification', { title: 'Add Classification' });
  } catch (error) {
    res.status(500).send('Error loading classification view: ' + error.message);
  }
};

// Handle adding a classification
exports.addClassification = async (req, res) => {
  const { classification_name } = req.body;
  try {
    await invModel.addClassification(classification_name);
    res.redirect('/inv/');
  } catch (error) {
    res.status(500).send('Error adding classification: ' + error.message);
  }
};

// View to add inventory
exports.addInventoryView = async (req, res) => {
  try {
    const classificationList = await util.buildClassificationList();
    res.render('inventory/add-inventory', { 
      title: 'Add Inventory', 
      classificationList 
    });
  } catch (error) {
    res.status(500).send('Error loading inventory view: ' + error.message);
  }
};

// Handle adding inventory
exports.addInventory = async (req, res) => {
  const { inv_make, inv_model, inv_description, inv_price, inv_year, inv_miles, inv_color, classification_id } = req.body;
  try {
    await invModel.addInventory({ inv_make, inv_model, inv_description, inv_price, inv_year, inv_miles, inv_color, classification_id });
    res.redirect('/inv/');
  } catch (error) {
    res.status(500).send('Error adding inventory: ' + error.message);
  }
};
