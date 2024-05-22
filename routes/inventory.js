const express = require('express');
const router = express.Router();
const authorizeRoles = require('../middleware/authorize');
const Vehicle = require('../../models/vehicleModel');
const { renderVehicleDetail } = require('../../utilities');

// Route to manage inventory (restricted to Employee and Admin roles)
router.get('/manage', authorizeRoles('Employee', 'Admin'), (req, res) => {
  res.render('inventory/manage');
});

// Route to display vehicle detail
router.get('/:id', async (req, res, next) => {
    try {
        const vehicleId = req.params.id;
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).send('Vehicle not found');
        }
        const htmlContent = renderVehicleDetail(vehicle);
        res.render('inventory/detail', { htmlContent });
    } catch (err) {
        next(err);
    }
});

// Add other inventory routes here as needed

module.exports = router;
