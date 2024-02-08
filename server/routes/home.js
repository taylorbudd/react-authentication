const UserController = require('../controller/userController');
const express = require('express');
const router = express.Router();

router.get('/', UserController.getUser);

module.exports = router;
