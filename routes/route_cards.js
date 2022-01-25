var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_card')
var controller_users = require('../controllers/controller_users')
const { validationResult, body, param } = require('express-validator')
var utilities = require('../utilities/utilities')

/**
 * @route GET /cards
 * @group Find All User's Cards 
 * @returns {object} 200 - All Cards
 * @returns {Error} 400 - Error
 */

/**
 * @route POST /cards
 * @group Add new User and Card 
 * @param {object} object.body - Card information to add - eg. {"amount" : 10,"person" : "User Ficticio","email" : "newUser@gmail.com","role" : "user"}
 * @returns {object} 200 - User created
 * @returns {Error} 400 - Request Body Errors
 * @returns {Error} 400 - Error creating
 */
router.route('/')
    .get(utilities.validateToken,utilities.verifyAdmin, controller.list)
    .post(utilities.validateToken,utilities.verifyAdmin, controller.addCard, controller_users.addUser)

/**
 * @route GET /cards/{id}
 * @group Find User Card
 * @returns {object} 200 - User Found
 * @returns {Error} 404 - User not found
 */

/**
 * @route DELETE /cards/{id}
 * @group Delete User and Card
 * @returns {object} 200 - User Delete
 * @returns {Error} 404 - User not found
 */
router.route('/:id')
    .get(/* utilities.validateToken,utilities.verifyAdmin, */ controller.getUserCard)
    .delete(/* utilities.validateToken,utilities.verifyAdmin, */ controller.removeUserCard)

module.exports = router