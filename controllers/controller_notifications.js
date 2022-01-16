const notification = require("../models/model_notifications"); 

const getAllUserNotifications = (req, res) => {
    notification.find({card: req.params.id}, function (err, notifications) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(notifications); 
    })
}

const sendNotification = (req, res) => {
    const newNotification = new notification({ card: req.params.id , date: Date.now(), message: "Compra efetuada."});

    newNotification.save(function (err, notification) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(notification); 
    })
}
exports.sendNotification = sendNotification;
exports.getAllUserNotifications = getAllUserNotifications;