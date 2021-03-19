const express = require('express');
const router = express.Router();
const mongoose = require('../config/connection');
const ProductService = require('./../service/productService');


/* GET Get all products */
router.get('/products', ProductService.findAllProducts);

/* POST Get products by id */
router.post('/getproductid', ProductService.findProductById);

/* POST Get products by id */
router.post('/get-product', ProductService.findProduct);

/* DELETE Delete products by id */
router.delete('/:id', ProductService.deleteProductById);

/* POST Add or Update product */
router.post('/save-update', ProductService.saveUpdateProduct);

/* GET Get products by supplierId */
router.get('/bysupplierid/:id', ProductService.findProductsBySupplierId);

/* POST Get products by params */
router.post('/search-by-paramsid', ProductService.getProductByPrams);

/* GET Get all types */
router.get('/types', ProductService.getAllTypes);

/* GET Get types by id */
router.get('/types/:id', ProductService.getTypesBySupplier);

module.exports = router;