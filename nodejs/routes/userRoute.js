let express = require('express');
let router = express.Router();
let mongoose = require('../config/connection');
let UserService = require('./../service/userService');

const service = new UserService();

/* GET Get all users */
router.get('/users', (req, res, next) => service.findAllUsers(res));

/* POST Get users by id */
router.post('/getuser', (req, res, next) => service.findUserByUserName(req, res));

/* POST Get users by id */
router.post('/get-user', (req, res, next) => service.findUser(req, res));

/* POST Get users by params */
router.post('/search-by-params', (req, res, next) => service.getUsersByParams(req));

/* POST Exists users by id */
router.post('/exists', (req, res, next) => service.existsUserByUserName(req, res));

/* DELETE Delete users by id */
router.delete('/:id', (req, res, next) => service.deleteUserById(req, res));

/* POST Add or update user */
router.post('/save-update', (req, res, next) => service.saveUpdateUser(req, res));

module.exports = router;