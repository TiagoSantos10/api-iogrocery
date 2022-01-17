const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    token: String,
    user_name: String,
    height: Number,
    weight: Number,
    card: String,
    img: String,
    waterObjective: Number,
    role: String
});

const user = mongoose.model('iopaymentcard_users', userSchema);

module.exports = user;