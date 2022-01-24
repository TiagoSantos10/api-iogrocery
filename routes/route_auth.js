const express = require('express');
const authController = require("../controllers/controller_auth");

let router = express.Router();

/**
 * @route POST /login
 * @group Login 
 * @param {object} object.body - User - eg. {"userName":"Tiago Santos", "userId": 109286653727302129378, "userEmail": "nunocos125@gmail.com", "userImg" : "https://lh3.googleusercontent.com/a-/AOh14Gh07f0xyIg0u0FiHqXpxvOn9U9_x7d_kJqmLFN-M50"}
 * @returns {object} 200 - User - eg. {"card": "61e385d5662f0d42bf4f9bd8", "email": "nunocos125@gmail.com","access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTM4NWQ1NjYyZjBkNDJiZjRmOWJkOCIsImVtYWlsIjoibnVub2NvczEyNUBnbWFpbC5jb20iLCJpYXQiOjE2NDMwNjY1OTR9.sC5z_YXW8CvQXHf8YMD2IfezZOhYJrCtcZJ7oKot77I","role": "admin"}
 * @returns {Error} 404 - User Not Found
 */
router.route('/')
    .post(authController.login)


module.exports = router;