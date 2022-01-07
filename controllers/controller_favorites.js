const favorite = require("../models/model_favorites"); 

const list = (res) => {
    favorite.find(function (err, favorites) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(favorites); 
    })
}

exports.list = list;