const express = require('express');
const router = express.Router();
const mongoose = require('../config/connection');
const UserService = require('./../service/userService');


/* GET Get all users */
router.get('/users', UserService.findAllUsers);

/* POST Get users by id */
router.post('/getuser', UserService.findUserByUserName);

/* POST Get users by id */
router.post('/get-user', UserService.findUser);

/* POST Get users by params */
router.post('/search-by-params', UserService.getUsersByParams);

/* POST Exists users by id */
router.post('/exists', UserService.existsUserByUserName);

/* DELETE Delete users by id */
router.delete('/:id', UserService.deleteUserById);

/* POST Add or update user */
router.post('/save-update', UserService.saveUpdateUser);

module.exports = router;