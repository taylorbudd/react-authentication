const express = require('express');
const router = express.Router();
const AuthController = require('../controller/authController');

router.post('/', AuthController.loginUser);

module.exports = router;