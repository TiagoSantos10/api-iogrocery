const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    card: String,
    product: String
});

const favorite = mongoose.model('iopaymentcard_favorites', favoriteSchema);

module.exports = favorite;