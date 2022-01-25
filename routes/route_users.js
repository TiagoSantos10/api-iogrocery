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


/**
 * @route GET /users
 * @group Get all users
 * @returns {object} 200 - All users
 * @returns {Error} 404 - No users found
 */
router.route('/')
    .get(/* utilities.validateToken,utilities.verifyAdmin, */ controller.list)

/**
 * @route GET /users/{id}/favorites
 * @group Get all user favorite products
 * @returns {object} 200 - All user favorite product
 * @returns {Error} 404 - No favorites found
 */

/**
 * @route POST /users/{id}/favorites
 * @group Add Product to favorites 
 * @param {object} object.body - Product to Add to favorites - eg. {"product" : "61ec1c1aac11ab22e6f90cd5"}
 * @returns {object} 200 - Product add to favorites
 * @returns {Error} 400 - Error adding product to favorites
 */

/**
 * @route DELETE /users/{id}/favorites
 * @group Remove product from favorites
 * @returns {object} 200 - Product removed from favorites
 * @returns {Error} 400 - Error deleting from favorites
 */
router.route('/:id/favorites')
    .get(utilities.validateToken, utilities.verifyLoggedUser, controller_favorites.getAllUserFavorites)
    .post(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_favorites.addFavorite)
    .delete(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_favorites.removeFavorite)

/**
 * @route GET /users/{id}/notifications
 * @group Get all user notifications
 * @returns {object} 200 - All user notifications
 * @returns {Error} 404 - No notifications found
 */   
router.route('/:id/notifications')
    .get(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_notifications.getAllUserNotifications)

/**
 * @route GET /users/{id}/water
 * @group Get all user daily water records
 * @returns {object} 200 - All user water records
 * @returns {Error} 404 - No water records found
 */   

/**
 * @route POST /users/{id}/water
 * @group Add water record
 * @param {object} object.body - Record to add - eg. {"quantity" : 1.9}
 * @returns {object} 200 - Water record added
 * @returns {Error} 400 - Error adding water record
 */
router.route('/:id/water')
    .get(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_water.getUserDailyWater)
    .post(utilities.validateToken, utilities.verifyLoggedUser, controller_water.checkWaterObjective, controller_notifications.sendNotification, controller_water.addWater)

/**
 * @route GET /users/{id}/cupons
 * @group Get all user cupons
 * @returns {object} 200 - All user cupons
 * @returns {Error} 404 - No cupons found
 */       
router.route('/:id/cupons')
    .get(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_cupons.getUserCupons)

/**
 * @route GET /users/{id}/balance
 * @group Get all user balances
 * @returns {object} 200 - All user balance
 * @returns {Error} 404 - No balances found
 */
router.route('/:id/balance')
    .get(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_balance.getUserBalance)

/**
 * @route GET /users/{id}/purchases
 * @group Get all user purchases
 * @returns {object} 200 - All user purchases
 * @returns {Error} 404 - No purchases found
 */
router.route('/:id/purchases')
    .get(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_purchases.getUserPurchases)

/**
 * @route GET /users/{id}/calories
 * @group Get all user daily calories records
 * @returns {object} 200 - All user calories records
 * @returns {Error} 404 - No calories records found
 */
router.route('/:id/calories')
    .get(/* utilities.validateToken, utilities.verifyLoggedUser, */ controller_calories.getUserDailyCalories)

/**
 * @route GET /users/{id}
 * @group Get user profile
 * @returns {object} 200 - user profile
 * @returns {Error} 404 - user not found
 */

/**
 * @route POST /users/{id}
 * @group Buy Products
 * @param {object} object.body - Products to buy - eg. {"products" : [{"id" : "61e36398f5d596d428326ee1","quantity" : 45}],"cupon" : ""}
 * @returns {object} 200 - Purchase done
 * @returns {Error} 400 - Error in the process to buy a product
 */

/**
 * @route PUT /users/{id}
 * @group Charge a user card
 * @param {object} object.body - Quantity to charge the card - eg. {"amount" : 5}
 * @returns {object} 200 - charge user card done
 * @returns {Error} 400 - Error charging user
 */

/**
 * @route PATCH /users/{id}
 * @group Edit User Profile
 * @param {object} object.body - Settings to update - eg. {"height": 1.78,"weight": 65,"caloriesLimit": 2600}
 * @returns {object} 200 - Update profile successful
 * @returns {Error} 400 - Error updating user profile
 */
router.route('/:id')
    .get(utilities.validateToken, utilities.verifyLoggedUser, controller.getProfile)
    .post(utilities.validateToken, utilities.verifyLoggedUser, controller_products.checkQuantity,  controller_card.checkAmount, controller_cupons.checkCuponUsed, controller_cupons.removeCupon,controller_notifications.sendNotification,controller_balance.addBalance, controller_card.updateSpentAmount, controller_cupons.addUserCupon,controller_notifications.sendNotification, controller_card.updateAmount, controller_products.updateQuantity, controller_notifications.sendNotification, controller_calories.addCalories , controller_calories.checkUserCalories , controller_notifications.sendNotification,controller_purchases.addPurchase)
    .put(utilities.validateToken,utilities.verifyAdmin, controller_card.checkUserAmount,controller_notifications.sendNotification , controller_card.updateAmount)
    .patch(utilities.validateToken, utilities.verifyLoggedUser, controller.editProfile)

module.exports = router