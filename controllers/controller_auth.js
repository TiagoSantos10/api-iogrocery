const user = require("../models/model_users");
const product = require("../models/model_product");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt_config");

const login = async (req, res) => {
    let userFound = await user.find({email: req.body.userEmail});
    console.log(userFound[0]);
    if (userFound.length === 0) {
        res.status(404).json("User not found.");
    }

    let token = jwt.sign({ id: userFound[0].card, email: userFound[0].email}, config.secret);

    let updatedUser = await user.updateOne({ card: userFound[0].card }, {
        $set: {
            'img': req.body.userImg
        }
    });

    console.log(updatedUser);       

    return res.status(200).json({
        card: userFound[0].card,
        email: userFound[0].email,
        access_token: token,
        role: userFound[0].role
    });

}

exports.login = login;