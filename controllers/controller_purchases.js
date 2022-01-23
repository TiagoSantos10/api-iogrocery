const purchase = require("../models/model_purchases");
//const ObjectId = require('mongodb').ObjectId; 

const list = (req, res) => {
    purchase.find(function(err, purchases) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(purchases);
    })
}

const addPurchase = (req, res) => {
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
        return res.status(200).json(purchase);
    })
}

const getUserPurchases = async (req, res) => {
    let userPurchases = await purchase.find({card: req.params.id});

    if (userPurchases.length !== 0) {
        res.status(200).json(userPurchases);
    } else {
        res.status(404).json("User doesnt have any purchases records");
    }
}


exports.list = list;
exports.addPurchase = addPurchase;
exports.getUserPurchases = getUserPurchases;