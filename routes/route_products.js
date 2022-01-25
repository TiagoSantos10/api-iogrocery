var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_product')
var controller_calories = require('../controllers/controller_calories')
const { validationResult, body, param } = require('express-validator')
var utilities = require('../utilities/utilities')


/**
 * @route GET /products
 * @group Get all products
 * @returns {object} 200 - All products
 * @returns {Error} 404 - No products found
 */

/**
 * @route POST /products
 * @group Create Product
 * @param {object} object.body - Product to add - eg. {"price" : 1.75,"units": 6,"name": "teste1","bought_by": "CFP","quantity": 1,"img": "https://www.recheio.pt/catalogo/media/catalog/product/cache/1/image/900x900/9df78eab33525d08d6e5fb8d27136e95/6/1/61036_2.jpg","code": 0,"energia": 25,"lipidos": 1.8,"hidratos": 3.6,"acucares": 3.4,"fibra": 1.9,"proteina": 1.4,"sal": 0.5}
 * @returns {object} 200 - Product Created
 * @returns {Error} 400 - Error creating
 */
router.route('/')
    .get(/* utilities.validateToken */controller.list)
    .post(/* utilities.validateToken,utilities.verifyAdmin, */ controller_calories.createPortfirProduct, controller.addProduct)
    

/**
 * @route PUT /products/{id}
 * @group Change Product quantity
 * @param {object} object.body - Product to add quantity - eg. {"quantity" : 2}
 * @returns {object} 200 - Product Quantity Changed
 * @returns {Error} 400 - Error Editing product quantity
 */    

/**
 * @route GET /products/{id}
 * @group Get one product
 * @returns {object} 200 - One Product by Id
 * @returns {Error} 404 - Product not found
 */
router.route('/:id')
    .get(/* utilities.validateToken, */controller.getProductById)
    .put(/* utilities.validateToken,utilities.verifyAdmin, */ /* controller_calories.createPortfirProduct , */controller.editProduct)



module.exports = router