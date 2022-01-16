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

const addPurchase = (req, res, next) => {
    const newPurchase = new purchase({
        card: req.params.id,
        balance: req.balance,
        products: req.body.products,
        date: Date.now()
    })

    newPurchase.save(function(err, purchase) {
        if (err) {
            return res.status(400).send(err); 
        }
        res.status(200).json(purchase);
    })
}


exports.list = list;
exports.addPurchase = addPurchase;
