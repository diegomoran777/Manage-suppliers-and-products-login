const express = require('express');
const router = express.Router();
const mongoose = require('../config/connection');
const SupplierService = require('../service/supplierService');


/* GET Get all suppliers */
router.get('/suppliers', SupplierService.findAllSuppliers);

/* POST Get suppliers by params */
router.post('/search-by-params', SupplierService.getSuppliersByParams);

/* POST Get suppliers by id */
router.post('/get-supplier', SupplierService.findSupplier);

/* POST Get suppliers by id */
router.post('/getsupplierid', SupplierService.findSupplierById);

/* POST Add or Update supplier */
router.post('/save-update', SupplierService.saveUpdateSupplier);

/* DELETE Supplier by id */
router.delete('/:id', SupplierService.deleteSupplierById);


module.exports = router;
