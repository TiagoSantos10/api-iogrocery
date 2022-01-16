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
    const price_per_unit = (function () {
        let price_per_unit = (req.body.price / req.body.units);

        return price_per_unit.toFixed(2);
    })

    const availableQuantity = (function () {
        return parseInt(req.body.quantity) * parseInt(req.body.units);
    })
    //not tested

    const newProduct = new product(
        {
            price: req.body.price,
            units: req.body.units,
            price_per_unit: price_per_unit(),
            name: req.body.name,
            bought_by: req.body.bought_by,
            quantity: availableQuantity(),
            last_refilled: Date.now(),
            img: req.body.img
        }
    );

    newProduct.save(function (err, product) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(product);
    })
}

const getProductById = (req, res) => {
    product.find({ _id: ObjectId(`${req.params.id}`) }, function (err, product) {
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
    product.find({ _id: ObjectId(`${req.params.id}`) }, function (err, productToAdd) {
        if (productToAdd) {
            product.updateOne({ _id: ObjectId(`${req.params.id}`) }, {
                $set: {
                    'quantity': productToAdd[0].quantity + (parseInt(req.body.quantity) * productToAdd[0].units)
                }
            }, function (err, productEdited) {
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

//não está a remover o numero de produtos necessarios da base de dados.
const updateQuantity = (req, res, next) => {
    for (let index = 0; index < req.body.products.length; index++) {
        product.find({ _id: ObjectId(`${req.body.products[index].id}`) }, function (err, productToUpdate) {
            if (productToUpdate) {
                let newQuantity = productToUpdate[0].quantity - req.body.products[index].quantity;
                console.log("newQuantity", newQuantity);
                product.updateOne({ _id: ObjectId(`${req.body.products[index].id}`) }, {
                    $set: {
                        'quantity': newQuantity
                    }
                }, function (err, productEdited) {
                    if (err) {
                        res.status(400).send(err);
                    }
                    console.log(productEdited);
                })
                if (index == 0) {
                    next();
                }
            } else {
                res.status(404).json("Product not found.");
            }
        });
        
    }
    
}

const checkQuantity = (req, res, next) => {
    let sumAmount = 0;
    for (let index = 0; index < req.body.products.length; index++) {
        product.find({ _id: ObjectId(`${req.body.products[index].id}`) }, function (err, product) {
            console.log(req.body.products[index]);
            if (err) {
                res.status(400).send(err);
            }
            //console.log(product[0]);
            if (product[0].quantity < req.body.products[index].quantity) {
                return res.status(400).json("Quantidade de produtos insuficiente");
            } else {
                console.log("quantidade suficiente");
                sumAmount += product[0].price_per_unit * req.body.products[index].quantity;
                console.log("here", sumAmount.toFixed(2));
                console.log(index);
                if (index == 0) {
                    req.amount = Number(sumAmount.toFixed(2));
                    next();
                }
            }

        });

    }

}

exports.addProduct = addProduct;
exports.checkQuantity = checkQuantity;
exports.list = list;
exports.getProductById = getProductById;
exports.editProduct = editProduct;
exports.updateQuantity = updateQuantity;