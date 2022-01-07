var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_balance')
const { validationResult, body, param } = require('express-validator')

//rota acessada por admin
router.get('/',  function (req, res) {
    controller.list(res); 
})

module.exports = router