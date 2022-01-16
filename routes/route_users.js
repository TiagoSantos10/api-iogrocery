var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_users')
var controller_purchases = require('../controllers/controller_purchases')
var controller_balance = require('../controllers/controller_balance')
var controller_card = require('../controllers/controller_card')
var controller_products = require('../controllers/controller_product')
const { validationResult, body, param } = require('express-validator')

//rota acessada por admin
router.get('/',  function (req, res) {
    controller.list(res); 
})

router.route('/:id')
    .post(controller_products.checkQuantity, controller_card.checkAmount, controller_balance.addBalance , controller_card.updateAmount ,controller_products.updateQuantity, controller_purchases.addPurchase)


module.exports = router