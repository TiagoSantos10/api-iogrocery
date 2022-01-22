
const card = require("../models/model_card");
const ObjectId = require('mongodb').ObjectId;
const user = require("../models/model_users");

const list = (res) => {
    user.find(function(err, users) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(users);
    })
}

const getProfile = async  (req, res) => {
    let userProfile = await user.findOne({card: req.params.id});
    let cardProfile = await card.findById(req.params.id);
    if (cardProfile !== undefined && userProfile !== undefined) {
        res.status(200).json({
            userCard: cardProfile,
            userContent: userProfile
        });
    } else {
        res.status(400).json({
            error: "User not found."
        })
    }
}


const addUser = (req, res) => {

    if (!req.body) {
        return res.status(400).json("Body is mandatory.");
    } else if (!req.body.role || req.body.role == undefined) {
        return res.status(400).json("Role is mandatory.");
    } else if (!req.body.email || req.body.email == undefined) {
        return res.status(400).json("Email is mandatory.");
    }

    const newUser = new user({
        email: req.body.email,
        token: "",
        user_name: req.card.person,
        height: 0,
        weight: 0,
        card: req.card._id,
        img: "",
        waterObjective: 1.5,
        role: req.body.role,
        caloresLimit: 0
    });

    newUser.save(function(err, nUser) {
        if (err) {
            return res.status(400).json(err);
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
    }, function(err, userEdited) {
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