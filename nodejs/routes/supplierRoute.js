let express = require('express');
let router = express.Router();
let mongoose = require('../config/connection');
let SupplierService = require('../service/supplierService');

const service = new SupplierService();

/* GET Get all suppliers */
router.get('/suppliers', (req, res, next) => service.findAllSuppliers(res));

/* POST Get suppliers by params */
router.post('/search-by-params', (req, res, next) => service.getSuppliersByParams(req, res));

/* POST Get suppliers by id */
router.post('/get-supplier', (req, res, next) => service.findSupplier(req, res));

/* POST Get suppliers by id */
router.post('/getsupplierid', (req, res, next) => service.findSupplierById(req, res));

/* POST Add or Update supplier */
router.post('/save-update', (req, res, next) => service.saveUpdateSupplier(req, res));

/* DELETE Supplier by id */
router.delete('/:id', (req, res, next) => service.deleteSupplierById(req, res));


module.exports = router;
