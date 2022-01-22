const mongoose = require('mongoose');

const caloriesSchema = new mongoose.Schema({
    card: String,
    quantity: Number,
    date: Date
});

const calories = mongoose.model('iopaymentcard_calories', caloriesSchema);

module.exports = calories;