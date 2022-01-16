

const mongoose = require('mongoose');

const waterSchema = new mongoose.Schema({
    card: String,
    quantity: Number,
    date: Date
});

const water = mongoose.model('iopaymentcard_waters', waterSchema);

module.exports = water; 