const cupon = require("../models/model_cupons"); 
const user = require('../models/model_users')
const card = require('../models/model_card')
const ObjectId = require('mongodb').ObjectId;

const addUserCupon = (req, res, next) => {
   
    card.find({_id: ObjectId(`${req.params.id}`) }, function(err, cards) {
        if (err) {
            res.status(400).send(err);
        }
        if (cards[0].amountSpent >= 10) {
            
            var future = new Date();
            
            const newCupon = new cupon({
                card: req.params.id,
                discount: 25,
                expiration_date: future.setDate(future.getDate() + 30)
            });
            newCupon.save(function(err, cupon){
                if (err) {
                    res.status(400).send(err);
                }
                console.log("Cupon added.");
                card.updateOne({_id: ObjectId(`${req.params.id}`) }, {
                    $set: {
                        'amountSpent': 0
                    }
                }, function (err, userEdited) {
                    if (err) {
                        res.status(400).send(err);
                    }
                    console.log(userEdited);
                    next();
                })
            })
        } else {
            console.log("Cupon not added.");
            next();
        }
    })
}

const getUserCupons = (req, res, next) => {
    cupon.find({card: req.params.id}, function(err, cupons) {
        if (err) {
            res.status(400).send(err);
        }
        if (cupons.length == 0) {
            res.status(404).json("No cupons yet.")
        } else {
            res.status(200).json(cupons)
        }
    })
}

exports.addUserCupon = addUserCupon;
exports.getUserCupons = getUserCupons;