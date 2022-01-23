var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_product')
var controller_calories = require('../controllers/controller_calories')
const { validationResult, body, param } = require('express-validator')
var utilities = require('../utilities/utilities')


router.route('/')
    .get(/* utilities.validateToken */controller.list)
    .post(/* utilities.validateToken,utilities.verifyAdmin, */ controller_calories.createPortfirProduct, controller.addProduct)
    

router.route('/:id')
    .get(/* utilities.validateToken, */controller.getProductById)
    .put(/* utilities.validateToken,utilities.verifyAdmin, */ controller_calories.createPortfirProduct ,controller.editProduct)



module.exports = router