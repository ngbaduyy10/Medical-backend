const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authValidate = require('../validates/auth.validate');

router.post('/register', authValidate.register, authController.register);

router.post('/login', authValidate.login, authController.login);

module.exports = router;