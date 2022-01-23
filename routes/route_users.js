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
var utilities = require('../utilities/utilities')
const { validationResult, body, param } = require('express-validator')

//rota acessada por admin
/* router.get('/', function (req, res) {
    controller.list(res);
}) */

router.route('/')
    .get(/* utilities.validateToken,utilities.verifyAdmin, */ controller.list)

router.route('/:id/favorites')
    .get(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_favorites.getAllUserFavorites)
    .post(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_favorites.addFavorite)
    .delete(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_favorites.removeFavorite)

router.route('/:id/notifications')
    .get(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_notifications.getAllUserNotifications)

router.route('/:id/water')
    .get(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_water.getUserDailyWater)
    .post(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_water.checkWaterObjective, controller_notifications.sendNotification, controller_water.addWater)

router.route('/:id/cupons')
    .get(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_cupons.getUserCupons)

router.route('/:id/balance')
    .get(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_balance.getUserBalance)

router.route('/:id/purchases')
    .get(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_purchases.getUserPurchases)

router.route('/:id/calories')
    .get(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_calories.getUserDailyCalories)


router.route('/:id')
    .get(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller.getProfile)
    .post(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_products.checkQuantity,  controller_card.checkAmount, controller_cupons.checkCuponUsed, controller_cupons.removeCupon,controller_notifications.sendNotification,controller_balance.addBalance, controller_card.updateSpentAmount, controller_cupons.addUserCupon,controller_notifications.sendNotification, controller_card.updateAmount, controller_products.updateQuantity, controller_notifications.sendNotification, controller_calories.addCalories , controller_calories.checkUserCalories , controller_notifications.sendNotification,controller_purchases.addPurchase)
    .put(/* utilities.validateToken,utilities.verifyAdmin, */ controller_card.checkUserAmount,controller_notifications.sendNotification , controller_card.updateAmount)
    .patch(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller.editProfile)

module.exports = router