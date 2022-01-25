var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_balance')
const { validationResult, body, param } = require('express-validator')
var utilities = require('../utilities/utilities')


/**
 * @route GET /balance
 * @group All Balances
 * @returns {object} 200 - All Balances - eg. [{"_id": "615ac19d0ebd4907c9748778","card": "615ac18a0ebd4907c9748777","old_amount": 2.17,"new_amount": 1.87,"movement": "negative","amount": -0.3,"date": "2021-10-04T08:55:57.065Z","__v": 0},{"_id": "615ad3e20ebd4907c974877e","card": "615ac2470ebd4907c974877a","old_amount": 0.2,"new_amount": 5.2, "movement": "positive", "amount": 5,"date": "2021-10-04T10:13:54.501Z","__v": 0}]
 * @returns {Error} 400 - Error
 */
router.route('/')
    .get(/* utilities.validateToken,utilities.verifyAdmin, */ controller.list)

module.exports = router