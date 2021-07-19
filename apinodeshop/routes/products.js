const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const ProductController = require('../controllers/products');

const Product = require('../models/product');


router.get('/',ProductController.products_get_all); 

router.post('/', checkAuth, ProductController.products_create_product);

router.get('/:productId',checkAuth, ProductController.products_get_product);

router.patch('/:productID', checkAuth, ProductController.products_update_product);
router.delete('/:productId', checkAuth, ProductController.product_delete);
 


module.exports = router;