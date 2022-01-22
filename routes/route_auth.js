const express = require('express');
const authController = require("../controllers/controller_auth");

let router = express.Router();

router.route('/')
    .post(authController.login)


module.exports = router;