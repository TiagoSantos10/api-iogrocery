const favorite = require("../models/model_favorites");
const product = require("../models/model_product");


const getAllUserFavorites = async (req, res) => {
    /* favorite.find({card: req.params.id}, function( err, favorites) {
        let productsArray = [];
        if (err) {
            res.status(400).send(err);
        }
        for (const fav of favorites) {
            productsArray.push(product.filter(p => p._id === `ObjectId(${fav.product})`))  
        }
        res.status(200).json(productsArray);
    }) */

    let productsArray = [];
    let favorites = await favorite.find({card: req.params.id});
    console.log(favorites);
    if (favorites.length == 0) {
        res.status(404).json("User has no favorites.");
    }
    
    let products = {}
    for (const fav of favorites) {
        products = await product.findById(fav.product);
        productsArray.push(products)
    }
    
    res.status(200).json(productsArray)
}

const addFavorite = (req, res) => {
    const addProductFavorite = new favorite({
        card: req.params.id,
        product: req.body.product
    });

    addProductFavorite.save(function(err, favorite) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(favorite);
    })
}

const removeFavorite = (req, res) => {
    favorite.deleteOne({card: req.params.id, product: req.body.product}, function(err, favorite) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json("Favorito removido com sucesso");
    })
}
exports.addFavorite = addFavorite;
exports.getAllUserFavorites = getAllUserFavorites;
exports.removeFavorite = removeFavorite;