var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_notifications')
const { validationResult, body, param } = require('express-validator')

router.get('/',  function (req, res) {
    controller.list(res); 
});

router.post('/', function (req, res) {
    controller.sendNotification(req, res);
})

module.exports = router