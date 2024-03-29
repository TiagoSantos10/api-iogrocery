const balance = require("../models/model_balance");
const products = require("../models/model_product");
const cards = require("../models/model_card");
const ObjectId = require('mongodb').ObjectId;


const list = (req, res) => {
    balance.find(function (err, balance) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(balance);
    })
}

//efetuar o extrato do balance
const addBalance = (req, res, next) => {
    const newBalance = new balance({
        card: req.params.id,
        old_amount: req.old_amount,
        new_amount: req.new_amount,
        movement: req.movement,
        amount: -req.amount,
        date: Date.now()
    });

    newBalance.save(function(err, balance) {
        if (err) {
            return res.status(400).send(err);
        }
        console.log("balance",balance);
        req.balance = balance._id
        next();
    })
}

const getUserBalance = async (req, res) => {
    let userBalance = await balance.find({card: req.params.id});

    if (userBalance.length !== 0) {
        res.status(200).json(userBalance);
    } else {
        res.status(404).json("User doesnt have any balance records");
    }
}

exports.list = list;
exports.addBalance = addBalance;
exports.getUserBalance = getUserBalance;