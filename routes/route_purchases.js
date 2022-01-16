var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_purchases')

const { validationResult, body, param } = require('express-validator')

router.get('/',  function (req, res) {
    controller.list(res); 
})

module.exports = router