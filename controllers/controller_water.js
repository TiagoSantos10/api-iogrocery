const user = require("../models/model_users");
const card = require("../models/model_card");
const water = require("../models/model_water");
const ObjectId = require('mongodb').ObjectId;

const getUserDailyWater = async (req, res) => {
    var today = new Date();
    let message = "";
    
    let userContent = await user.findOne({card: req.params.id});

    if (userContent !== undefined) {
        let userWaterInfo = await water.find({ card: req.params.id });
        if (userWaterInfo !== undefined) {
            

            waterFiltered = userWaterInfo.filter(
                w => w.date.toDateString() == today.toDateString()
            )
        
            console.log(waterFiltered);
            let sumQuantity = 0;
            for (const water of waterFiltered) {
                sumQuantity += water.quantity;
            }

            if (userContent.weight === 0) {
                message = "Update your weight in your profile!";
            }
    
            res.status(200).json({
                refills: waterFiltered,
                totalQuantity: sumQuantity,
                waterObjective: userContent.waterObjective,
                message: message
            });
        } else {
            res.status(404).json("User doesn't have any water info.");
        }
    } else {
        res.status(404).json("User not found.");
    }

}

const addWater = (req, res) => {
    const newWater = new water({
        card: req.params.id,
        quantity: req.body.quantity,
        date: Date.now()
    });

    newWater.save(function (err, water) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(water);
    })
}

exports.getUserDailyWater = getUserDailyWater;
exports.addWater = addWater;