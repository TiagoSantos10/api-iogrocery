const product = require("../models/model_product"); 

const list = (res) => {
    product.find(function (err, products) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(products); 
    })
}

const addProduct = (req, res) => {
    const price_per_unit = (function() {
        return req.body.price / req.body.units;
    })

    const availableQuantity = (function() {
        return parseInt(req.body.quantity) * parseInt(req.body.units);
    })
    //not tested

    const newProduct = new product(
        {
            price : req.body.price,
            units: req.body.units,
            price_per_unit: price_per_unit(),
            name: req.body.name,
            bought_by: req.body.bought_by,
            quantity: availableQuantity(),
            last_refilled: Date.now(),
            img: req.body.img
        }
    );

    newProduct.save(function( err, product) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(product);
    })
}

exports.addProduct = addProduct;
exports.list = list;