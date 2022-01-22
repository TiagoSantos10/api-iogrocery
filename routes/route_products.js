var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_product')
var controller_calories = require('../controllers/controller_calories')
const { validationResult, body, param } = require('express-validator')


router.route('/')
    .get(controller.list)
    .post(controller_calories.createPortfirProduct, controller.addProduct)
    

router.route('/:id')
    .get(controller.getProductById)
    .put(controller_calories.createPortfirProduct ,controller.editProduct)

/* router.get('/:id', function(req, res) {
    controller.getProductById(req, res);
})

router.put('/:id', function(req, res) {
    controller.editProduct(req, res);
}) */

module.exports = router