

const water = require("../models/model_water");
const ObjectId = require('mongodb').ObjectId;

const getUserDailyWater = (req, res) => {
    var today = new Date();

    water.find({card: req.params.id}, function (err, water) {
        if (err) {
            res.status(400).send(err); 
        }
        waterFiltered = water.filter(
            w => w.date.toDateString() == today.toDateString()
        )
        console.log(waterFiltered);
        let sumQuantity = 0;
        for (const water of waterFiltered) {
            sumQuantity += water.quantity;
        }
        res.status(200).json({
            refills: waterFiltered,
            totalQuantity: sumQuantity
        });
    })
}

const addWater = (req, res) => {
    const newWater = new water({
        card: req.params.id,
        quantity: req.body.quantity,
        date: Date.now()
    });

    newWater.save(function(err, water) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(water);
    })
}

exports.getUserDailyWater = getUserDailyWater;
exports.addWater = addWater;