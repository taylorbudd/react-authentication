const userController = require('../controller/userController');
const express = require('express');
const router = express.Router();

router.get('/', userController.getUser);

module.exports = router;