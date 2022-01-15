const mongoose = require('mongoose');

const purchaseSchema = mongoose.Schema({
    card: String,
    balance: String,
    products: [
        {
            id: String,
            quantity: Number
        }
    ],
    date: Date
});

const purchase = mongoose.model('iopaymentcard_purchases', purchaseSchema);

module.exports = purchase; 