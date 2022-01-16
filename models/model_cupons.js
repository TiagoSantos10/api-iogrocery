const mongoose = require('mongoose');

const cuponSchema = mongoose.Schema({
    card: String,
    discount: Number,
    expiration_date: Date
});

const cupon = mongoose.model('iopaymentcard_cupons', cuponSchema);

module.exports = cupon; 