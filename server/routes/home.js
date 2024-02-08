const UserController = require('../controller/user');
const express = require('express');
const router = express.Router();

router.get('/', UserController.getUser);

module.exports = router;
