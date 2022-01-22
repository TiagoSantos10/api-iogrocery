var jwt = require('jsonwebtoken');
const config = require('../config/jwt_config.js');
const user = require("../models/model_users")

const generateToken = (user_info, callback) => {
    let secret = config.secret; 
    let token = jwt.sign({
        data: user_info,
    }, secret);
    return callback(token); 
}

const validateToken = (req, res, next) => {
    
    let secret = config.secret; 
    let token = req.headers.authorization;

    if (!token) {
        res.status(403).json({message: "No token provided"});
    }

    jwt.verify(token.replace('Bearer ', ''), secret, function(error, decoded) {
        user.find({card: decoded.id}, function(err, userFound){
            if(error) {
                //return callback(false);
                return res.status(401).json({message: "Invalid Token"});
            } else {
                //return callback(true)
                req.loggedUser = userFound[0];
                console.log("logged user", req.loggedUser);
                next();
            }
        });
    })
}

const verifyAdmin = (req, res, next) => {
    //console.log("aqui: ", req.loggedUser);

    if (req.loggedUser.role === "admin") {
        next();
    } else {
        res.status(403).json({message: "This is an admin content."});
    }

}

const verifyLoggedUser = (req, res, next) => {
    if (req.loggedUser.card === req.params.id) {
        next();
    } else {
        res.status(403).json({message: "The authenticated user can not access this page."})
    }
}

exports.generateToken = generateToken;
exports.validateToken = validateToken;
exports.verifyAdmin = verifyAdmin;
exports.verifyLoggedUser = verifyLoggedUser;