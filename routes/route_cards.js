var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_card')
var controller_users = require('../controllers/controller_users')
const { validationResult, body, param } = require('express-validator')
var utilities = require('../utilities/utilities')

/* //rota acessada por admin
router.get('/',  function (req, res) {
    controller.list(res); 
}) */

router.route('/')
    .get(/* utilities.validateToken,utilities.verifyAdmin, */ controller.list)
    .post(/* utilities.validateToken,utilities.verifyAdmin, */ controller.addCard, controller_users.addUser)

router.route('/:id')
    .get(/* utilities.validateToken,utilities.verifyAdmin, */ controller.getUserCard)

module.exports = router