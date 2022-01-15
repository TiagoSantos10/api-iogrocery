const product = require("../models/model_product"); 
const ObjectId = require('mongodb').ObjectId; 

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

const getProductById = (req, res) => {
    product.find({_id: ObjectId(`${req.params.id}`)}, function (err, product) {
        if (err) {
            res.status(400).send(err); 
        }
        if (product.length == 0) {
            res.status(404).json(`Product with id ${req.params.id} not found.`);
        }
        res.status(200).json(product); 
    });

}

const editProduct = (req, res) => {
    product.find({_id: ObjectId(`${req.params.id}`)}, function(err, productToAdd) {
        if (productToAdd) {
            product.updateOne({_id: ObjectId(`${req.params.id}`)},{$set:{
                'quantity': productToAdd[0].quantity + (parseInt(req.body.quantity) * productToAdd[0].units)
            }}, function(err, productEdited) {
                if (err) {
                    res.status(400).send(err);
                }
                if (productEdited.modifiedCount == 1) {
                    res.status(200).json("Product Quantity added successfuly.");
                }
            })
        } else {
            res.status(404).json("Product not found.");
        }
    });
}

exports.addProduct = addProduct;
exports.list = list;
exports.getProductById = getProductById;
exports.editProduct = editProduct;