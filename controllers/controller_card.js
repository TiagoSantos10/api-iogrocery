const card = require("../models/model_card");
const user = require("../models/model_users");
const ObjectId = require('mongodb').ObjectId;

const list = (res) => {
    card.find(function(err, cards) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(cards);
    })
}

const getUserCard = (req, res) => {
    card.find({ _id: ObjectId(`${req.params.id}`) }, function(err, card) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(card[0]);
    })
}

const addCard = (req, res, next) => {

    if (!req.body) {
        return res.status(400).json("Body is mandatory.");
    } else if (!req.body.person || req.body.person == undefined) {
        return res.status(400).json("Person is mandatory.");
    } else if (!req.body.amount || req.body.amount == undefined) {
        return res.status(400).json("Amount is mandatory.");
    }



    user.find({ email: req.body.email }, function(err, user) {
        if (user[0] != undefined) {
            return res.status(400).json(err);
        } else {

            const newCard = new card({
                person: req.body.person,
                amount: req.body.amount,
                amountSpent: 0

            });

            newCard.save(function(err, card) {
                if (err) {
                    return res.status(400).send(err);
                }
                req.card = (card);
                next();
            })
        }
    })
}

const checkAmount = (req, res, next) => {
    card.find({ _id: ObjectId(`${req.params.id}`) }, function(err, cards) {
        if (err) {
            return res.status(400).send(err);
        }
        console.log("card if", req.amount);
        console.log(cards[0]);
        if (cards[0] != undefined) {
            if (cards[0].amount < req.amount) {
                return res.status(400).json("You don't have enough money.")
            }
            req.old_amount = cards[0].amount;
            req.movement = "negative";
            req.new_amount = cards[0].amount - req.amount;
            req.old_amount_spent = cards[0].amountSpent;
            next();
        } else {
            return res.status(404).json("User not found.")
        }

    })
}

const updateSpentAmount = (req, res, next) => {
    console.log("old amount spent", req.old_amount_spent);
    console.log("amount", req.amount);

    card.updateOne({ _id: ObjectId(`${req.params.id}`) }, {
        $set: {
            'amountSpent': req.old_amount_spent + req.amount
        }
    }, function(err, userEdited) {
        if (err) {
            return res.status(400).send(err);
        }
        console.log(userEdited);
        next();
    })
}

const updateAmount = (req, res, next) => {
    card.find({ _id: ObjectId(`${req.params.id}`) }, function(err, cardToUpdate) {
        if (cardToUpdate) {
            if (req.body.amount) {
                req.new_amount = cardToUpdate[0].amount + req.body.amount;
                card.updateOne({ _id: ObjectId(`${req.params.id}`) }, {
                    $set: {
                        'amount': req.new_amount
                    }
                }, function(err, cardEdited) {
                    if (err) {
                        return res.status(400).send(err);
                    }
                    if (cardEdited.modifiedCount == 1) {
                        console.log("amount modified");
                        res.status(200).json("Carregamento de cartão efetuado com sucesso.")
                    }
                })
            } else {
                card.updateOne({ _id: ObjectId(`${req.params.id}`) }, {
                    $set: {
                        'amount': req.new_amount
                    }
                }, function(err, cardEdited) {
                    if (err) {
                        return res.status(400).send(err);
                    }
                    if (cardEdited.modifiedCount == 1) {
                        console.log("amount modified");
                        next();
                    }
                })
            }

        } else {
            return res.status(404).json("card not found.");
        }
    });
}

exports.list = list;
exports.addCard = addCard;
exports.checkAmount = checkAmount;
exports.updateAmount = updateAmount;
exports.getUserCard = getUserCard;
exports.updateSpentAmount = updateSpentAmount;