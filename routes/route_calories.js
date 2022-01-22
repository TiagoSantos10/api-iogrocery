var express = require('express')
var router = express.Router()
var controller_calories = require('../controllers/controller_calories')



router.route('/')
    .post(controller_calories.getProductCalories)
    .put(controller_calories.addPortfirProduct)



module.exports = router