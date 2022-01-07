const card = require("../models/model_card"); 

const list = (res) => {
    card.find(function (err, cards) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(cards); 
    })
}

exports.list = list;