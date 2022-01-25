var express = require('express')
var router = express.Router()
var controller_calories = require('../controllers/controller_calories')
var utilities = require('../utilities/utilities')


/**
 * @route POST /calories
 * @group Find Product Calories 
 * @param {object} object.body - Product to Find - eg. {"name" : "biscoito gato"}
 * @returns {object} 200 - Product found
 * @returns {Error} 404 - Product Not Found
 */
router.route('/')
    .post(controller_calories.getProductCalories)
    /* .put(controller_calories.addPortfirProduct) */



module.exports = router