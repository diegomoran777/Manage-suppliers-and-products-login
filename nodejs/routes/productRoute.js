let express = require('express');
let router = express.Router();
let mongoose = require('../config/connection');
let ProductService = require('./../service/productService');

const service = new ProductService();

/* GET Get all products */
router.get('/products', (req, res, next) => service.findAllProducts(res));

/* POST Get products by id */
router.post('/getproductid', (req, res, next) => service.findProductById(req, res));

/* POST Get products by id */
router.post('/get-product', (req, res, next) => service.findProduct(req, res));

/* DELETE Delete products by id */
router.delete('/:id', (req, res, next) => service.deleteProductById(req, res));

/* POST Add or Update product */
router.post('/save-update', (req, res, next) => service.saveUpdateProduct(req, res));

/* GET Get products by supplierId */
router.get('/bysupplierid/:id', (req, res, next) => service.findProductsBySupplierId(req, res));

/* POST Get products by params */
router.post('/search-by-paramsid', (req, res, next) => service.getProductByPrams(req, res));

/* GET Get all types */
router.get('/types', (req, res, next) => service.getAllTypes(res));

/* GET Get types by id */
router.get('/types/:id', (req, res, next) => service.getTypesBySupplier(req, res));

module.exports = router;