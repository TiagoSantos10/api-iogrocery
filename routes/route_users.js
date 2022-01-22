var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_users')
var controller_purchases = require('../controllers/controller_purchases')
var controller_balance = require('../controllers/controller_balance')
var controller_card = require('../controllers/controller_card')
var controller_products = require('../controllers/controller_product')
var controller_favorites = require('../controllers/controller_favorites')
var controller_notifications = require('../controllers/controller_notifications')
var controller_water = require('../controllers/controller_water')
var controller_cupons = require('../controllers/controller_cupons')
var controller_calories = require('../controllers/controller_calories')
const { validationResult, body, param } = require('express-validator')

//rota acessada por admin
router.get('/', function (req, res) {
    controller.list(res);
})

router.route('/:id/favorites')
    .get(controller_favorites.getAllUserFavorites)
    .post(controller_favorites.addFavorite)
    .delete(controller_favorites.removeFavorite)

router.route('/:id/notifications')
    .get(controller_notifications.getAllUserNotifications)

router.route('/:id/water')
    .get(controller_water.getUserDailyWater)
    .post(controller_water.addWater)

router.route('/:id/cupons')
    .get(controller_cupons.getUserCupons)

router.route('/:id/balance')
    .get(controller_balance.getUserBalance)

router.route('/:id/purchases')
    .get(controller_purchases.getUserPurchases)

router.route('/:id/calories')
    .get(controller_calories.getUserDailyCalories)


router.route('/:id')
    .get(controller.getProfile)
    .post(controller_products.checkQuantity, controller_cupons.checkCuponUsed, controller_cupons.removeCupon, controller_card.checkAmount, controller_balance.addBalance, controller_card.updateSpentAmount, controller_cupons.addUserCupon, controller_card.updateAmount, controller_products.updateQuantity, controller_notifications.sendNotification, controller_calories.addCalories ,controller_purchases.addPurchase)
    .put(controller_card.updateAmount)
    .patch(controller.editProfile)

module.exports = router