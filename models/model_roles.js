const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    role: String
});

const role = mongoose.model('iopaymentcard_roles', roleSchema);

module.exports = role;