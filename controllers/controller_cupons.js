const cupon = require("../models/model_cupons");
const user = require('../models/model_users')
const card = require('../models/model_card')
const ObjectId = require('mongodb').ObjectId;

const addUserCupon = (req, res, next) => {
    card.find({ _id: ObjectId(`${req.params.id}`) }, function(err, cards) {
        if (err) {
            return res.status(400).send(err);
        }
        if (cards[0].amountSpent >= 10) {

            var future = new Date();

            const newCupon = new cupon({
                card: req.params.id,
                discount: 25,
                expiration_date: future.setDate(future.getDate() + 30)
            });
            newCupon.save(function(err, cupon) {
                if (err) {
                    return res.status(400).send(err);
                }
                console.log("Cupon added.");
                card.updateOne({ _id: ObjectId(`${req.params.id}`) }, {
                    $set: {
                        'amountSpent': 0
                    }
                }, function(err, userEdited) {
                    if (err) {
                        return res.status(400).send(err);
                    }
                    console.log(userEdited);
                    req.message = "Novo cupão disponivel."
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
    var today = new Date();

    cupon.find({ card: req.params.id }, function(err, cupons) {
        if (err) {
            res.status(400).send(err);
        }
        if (cupons.length == 0) {
            res.status(404).json("No cupons yet.")
        } else {
            cupons = cupons.filter(userCupon => Date.parse(userCupon.expiration_date) > Date.parse(today))
            if (cupons.length == 0) {
                res.status(404).json("No cupons yet.")
            }
            res.status(200).json(cupons)
        }
    })
}

const removeCupon = (req, res, next) => {
    if (req.usedCupon === true) {
        cupon.find({ _id: ObjectId(`${req.body.cupon}`) }, function(err, cupons) {
            if (err) {
                return res.status(400).json(err);
            } else {
                if (cupons.length == 0) {
                    return res.status(404).json("Invalid Cupon");
                } else {
                    cupon.deleteOne({ _id: req.body.cupon }, function(err, cupons) {
                        if (err) {
                            return res.status(400).send(err);
                        }
                        console.log("Cupon deleted");
                        req.message = "Cupão usado na compra."
                        next();
                    })
                }
            }
        })
    } else {
        next();
    }
    
}

const checkCuponUsed = (req, res, next) => {
    if (req.body.cupon == "") {
        req.usedCupon = false;
        next();
    } else {
        cupon.find({ _id: ObjectId(`${req.body.cupon}`) }, function(err, cupons) {
            if (err) {
                return res.status(400).json(err);
            } else {
                if (cupons.length == 0) {
                    return res.status(404).json("Invalid Cupon.");
                } else {
                    req.amount = (req.amount - (req.amount * (cupons[0].discount / 100)));
                    req.usedCupon = true;
                    //removeCupon(req, res, next);
                    
                    next();
                }
            }
        })
    }
}

exports.addUserCupon = addUserCupon;
exports.getUserCupons = getUserCupons;
exports.checkCuponUsed = checkCuponUsed;
exports.removeCupon = removeCupon;