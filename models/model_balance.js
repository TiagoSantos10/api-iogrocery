const mongoose = require('mongoose');

const balanceSchema = mongoose.Schema({
    card: String,
    old_amount: Number,
    new_amount: Number,
    movement: String,
    amount: Number,
    date: Date
},{ collection: 'iopaymentcard_balance' });

const balance = mongoose.model('iopaymentcard_balance', balanceSchema);

module.exports = balance; 