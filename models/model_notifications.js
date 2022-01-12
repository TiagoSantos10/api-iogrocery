const mongoose = require('mongoose');

const notificationsSchema = mongoose.Schema({
    card: String,
    date: Date,
    message: String
});

const notification = mongoose.model('iopaymentcard_notifications', notificationsSchema);

module.exports = notification;