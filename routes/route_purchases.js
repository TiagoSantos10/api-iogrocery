var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_purchases')
var utilities = require('../utilities/utilities')

const { validationResult, body, param } = require('express-validator')

/* router.get('/',  function (req, res) {
    controller.list( res); 
}) */

router.route('/')
    .get(/* utilities.validateToken,utilities.verifyAdmin, */ controller.list)

module.exports = router