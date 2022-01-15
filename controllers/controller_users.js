const user = require("../models/model_users"); 

const list = (res) => {
    user.find(function (err, users) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(users); 
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
        img: ""
    });

    newUser.save(function(err, nUser) {
        if (err) {
            res.status(400).send(err);
        }
        return res.status(200).json(nUser);
    })
}

exports.list = list;
exports.addUser = addUser;