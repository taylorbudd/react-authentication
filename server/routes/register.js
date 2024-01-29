const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

router.post('/', UserController.registerUser);

module.exports = router;