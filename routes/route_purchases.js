var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_purchases')
var utilities = require('../utilities/utilities')

const { validationResult, body, param } = require('express-validator')


/**
 * @route GET /purchases
 * @group Get all purchases
 * @returns {object} 200 - All purchases
 * @returns {Error} 404 - No purchases found
 */
router.route('/')
    .get(utilities.validateToken,utilities.verifyAdmin, controller.list)

module.exports = router