const express = require('express');
const router = express.Router();
const AuthController = require('../controller/authController');

router.get('/', AuthController.logoutUser);

module.exports = router;