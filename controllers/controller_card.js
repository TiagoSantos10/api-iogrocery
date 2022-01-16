const card = require("../models/model_card");
const user = require("../models/model_users");
const ObjectId = require('mongodb').ObjectId; 

const list = (res) => {
    card.find(function (err, cards) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(cards); 
    })
}

const addCard = (req, res, next) => {
  
    user.find({email: req.body.email} ,function (err, user){
        if (user[0] != undefined) {
            res.status(400).send(err)
        } else {
            
            const newCard = new card({
                person: req.body.person,
                amount: req.body.amount
            });

            newCard.save(function(err, card) {
                if (err) {
                    res.status(400).send(err);
                }
                req.card = (card);
                next();
            })
        }
    })
}

const checkAmount = (req, res, next) => {
    card.find({_id: ObjectId(`${req.params.id}`)}, function(err, user) {
        if (err) {
            res.status(400).send(err);
        }
        console.log("card if", req.amount);
        console.log(user[0]);
        if (user[0].amount < req.amount) {
            return res.status(400).json("You don't have enough money.")
        }
        req.old_amount = user[0].amount;
        req.movement = "negative";
        req.new_amount = user[0].amount - req.amount;
        next();
    })
}

const updateAmount = (req, res, next) => {
    card.find({ _id: ObjectId(`${req.params.id}`) }, function (err, cardToUpdate) {
        if (cardToUpdate) {
            card.updateOne({ _id: ObjectId(`${req.params.id}`) }, {
                $set: {
                    'amount': req.new_amount
                }
            }, function (err, cardEdited) {
                if (err) {
                    return res.status(400).send(err);
                }
                if (cardEdited.modifiedCount == 1) {
                    console.log("amount modified");
                    next();
                }
            })
        } else {
            res.status(404).json("card not found.");
        }
    });
}

exports.list = list;
exports.addCard = addCard;
exports.checkAmount = checkAmount;
exports.updateAmount = updateAmount;