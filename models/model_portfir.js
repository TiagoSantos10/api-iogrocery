const mongoose = require('mongoose');

const portfirSchema = new mongoose.Schema({
    code: Number,
    nome: String,
    energia: Number,
    lipidos: Number,
    hidratos: Number,
    acucares: Number,
    fibra: Number,
    proteina: Number,
    sal: Number
});

const portfir = mongoose.model('iopaymentcard_portfirs', portfirSchema);

module.exports = portfir;