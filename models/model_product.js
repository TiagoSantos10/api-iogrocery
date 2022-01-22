const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    price: Number,
    units: Number,
    price_per_unit: Number,
    name: String,
    bought_by: String,
    quantity: Number,
    last_refilled: Date,
    img: String,
    code: Number
});

const product = mongoose.model('iopaymentcard_products', productSchema);

module.exports = product; 