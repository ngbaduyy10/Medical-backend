const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/password.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.patch('/change', authMiddleware.authRequired([]), passwordController.changePassword);

module.exports = router;