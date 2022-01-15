var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_product')
const { validationResult, body, param } = require('express-validator')

router.get('/',  function (req, res) {
    controller.list(res); 
})

router.post('/', function (req, res) {
    controller.addProduct(req, res);
})

router.get('/:id', function(req, res) {
    controller.getProductById(req, res);
})

router.put('/:id', function(req, res) {
    controller.editProduct(req, res);
})

module.exports = router