const balance = require("../models/model_balance"); 

const list = (res) => {
    balance.find(function (err, balance) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(balance); 
    })
}

exports.list = list;