var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_card')
var controller_users = require('../controllers/controller_users')
const { validationResult, body, param } = require('express-validator')

//rota acessada por admin
router.get('/',  function (req, res) {
    controller.list(res); 
})

router.route('/')
    .post(controller.addCard, controller_users.addUser)

router.route('/:id')
    .get(controller.getUserCard)

/* router.post('/', function(req, res) {
    controller.addCard(req, res), controller_users.addUser(req, res);
}) */

module.exports = router