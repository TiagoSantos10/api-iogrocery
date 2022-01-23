const notification = require("../models/model_notifications");

const getAllUserNotifications = (req, res) => {
    notification.find({ card: req.params.id }, function(err, notifications) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(notifications);
    })
}

const sendNotification = (req, res, next) => {
    if (req.message) {
        const newNotification = new notification({ card: req.params.id, date: Date.now(), message: req.message });

        newNotification.save(function(err, notification) {
            if (err) {
                return res.status(400).send(err);
            }
            console.log(notification);
            next();
        }) 
    } else {
        next();
    }
    
}
exports.sendNotification = sendNotification;
exports.getAllUserNotifications = getAllUserNotifications;