const user = require("../models/model_users");
const card = require("../models/model_card");
const ObjectId = require('mongodb').ObjectId;

const list = (res) => {
    user.find(function (err, users) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(users);
    })
}

const getProfile = (req, res) => {
    user.find({ card: req.params.id }, function (err, users) {
        if (err) {
            res.status(400).send(err);
        }
        card.find({ _id: ObjectId(`${req.params.id}`) }, function (err, cards) {
            res.status(200).json({
                user: users[0],
                card: cards[0]
            });
        })

    })
}


const addUser = (req, res) => {

    const newUser = new user({
        email: req.body.email,
        token: "",
        user_name: req.card.person,
        height: 0,
        weight: 0,
        card: req.card._id,
        img: "",
        waterObjective: 1.5
    });

    newUser.save(function (err, nUser) {
        if (err) {
            res.status(400).send(err);
        }
        return res.status(200).json(nUser);
    })
}

const editProfile = (req, res) => {

    if (!req.body) {
        return res.status(400).json("Body must be defined.");
    } else if (req.body.height == 0 || !req.body.height) {
        return res.status(400).json("Height must be defined.");
    } else if (req.body.weight == 0 || !req.body.weight) {
        return res.status(400).json("Weight must be defined.");
    }

    const waterObjective = (35 * req.body.weight) / 1000;

    user.updateOne({ card: req.params.id }, {
        $set: {
            'height': req.body.height,
            'weight': req.body.weight,
            'waterObjective': waterObjective.toFixed(1)
        }
    }, function (err, userEdited) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json("User edited with success.");
        console.log(userEdited);
    })
}



exports.list = list;
exports.addUser = addUser;
exports.getProfile = getProfile;
exports.editProfile = editProfile;