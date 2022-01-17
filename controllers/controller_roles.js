const role = require("../models/model_roles");
const ObjectId = require('mongodb').ObjectId;

const listAllRoles = (req, res) => {
    role.find(function(err, roles) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(roles);
    })
}

exports.listAllRoles = listAllRoles;