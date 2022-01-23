var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_roles')
var utilities = require('../utilities/utilities')

const { validationResult, body, param } = require('express-validator')

router.route('/')
    .get(/* utilities.validateToken,utilities.verifyAdmin, */ controller.listAllRoles)


module.exports = router;