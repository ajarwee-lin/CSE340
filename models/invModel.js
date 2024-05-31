const pool = require('../database');

// Add classification
exports.addClassification = async (classification_name) => {
  const sql = 'INSERT INTO classification (classification_name) VALUES ($1)';
  return pool.query(sql, [classification_name]);
};

// Add inventory
exports.addInventory = async (inventoryData) => {
  const { inv_make, inv_model, inv_description, inv_price, inv_year, inv_miles, inv_color, classification_id } = inventoryData;
  const sql = `INSERT INTO inventory (inv_make, inv_model, inv_description, inv_price, inv_year, inv_miles, inv_color, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
  return pool.query(sql, [inv_make, inv_model, inv_description, inv_price, inv_year, inv_miles, inv_color, classification_id]);
};
