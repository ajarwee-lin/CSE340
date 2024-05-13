// Assuming you're using Mongoose
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    price: Number,
    mileage: Number,
    image: String
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
