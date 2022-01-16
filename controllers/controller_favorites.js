const favorite = require("../models/model_favorites"); 

const getAllUserFavorites = (req, res) => {
    favorite.find({card: req.params.id}, function( err, favorites) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(favorites);
    })
}

const addFavorite = (req, res) => {
    const addProductFavorite = new favorite({
        card: req.params.id,
        product: req.header('productId')
    });

    addProductFavorite.save(function(err, favorite) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(favorite);
    })
}

const removeFavorite = (req, res) => {
    favorite.deleteOne({card: req.params.id, product: req.header('productId')}, function(err, favorite) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json("Favorito removido com sucesso");
    })
}
exports.addFavorite = addFavorite;
exports.getAllUserFavorites = getAllUserFavorites;
exports.removeFavorite = removeFavorite;