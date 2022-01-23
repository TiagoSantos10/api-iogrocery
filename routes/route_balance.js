var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_balance')
const { validationResult, body, param } = require('express-validator')
var utilities = require('../utilities/utilities')

/* 
//rota acessada por admin
router.get('/',  function (req, res) {
    controller.list(res); 
}) */

router.route('/')
    .get(/* utilities.validateToken,utilities.verifyAdmin, */ controller.list)

module.exports = router