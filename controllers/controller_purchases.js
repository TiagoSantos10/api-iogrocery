const purchase = require("../models/model_purchases"); 
//const ObjectId = require('mongodb').ObjectId; 

const list = (res) => {
    purchase.find(function (err, purchases) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(purchases); 
    })
}


exports.list = list;
