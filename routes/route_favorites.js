var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_favorites')
const { validationResult, body, param } = require('express-validator')

module.exports = router