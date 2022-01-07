const product = require("../models/model_product"); 

const list = (res) => {
    product.find(function (err, products) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(products); 
    })
}

exports.list = list;