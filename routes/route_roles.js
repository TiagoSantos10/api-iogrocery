var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_roles')

const { validationResult, body, param } = require('express-validator')

router.route('/')
    .get(controller.listAllRoles)


module.exports = router;