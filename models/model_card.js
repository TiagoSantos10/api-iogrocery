const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
    person: String,
    amount: Number,
    amountSpent: Number
});

const card = mongoose.model('iopaymentcard_cards', cardSchema);

module.exports = card; 