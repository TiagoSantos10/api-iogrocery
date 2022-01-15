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

exports.list = list;
exports.addCard = addCard;