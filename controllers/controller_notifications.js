const notification = require("../models/model_notifications"); 

const list = (res) => {
    notification.find(function (err, notifications) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(notifications); 
    })
}

const sendNotification = (req, res) => {
    const newNotification = new notification({ card: req.body.card , date: Date.now(), message: "Pagamento efetuado."});

    newNotification.save(function (err, notification) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(notification); 
    })
}
exports.sendNotification = sendNotification;
exports.list = list;