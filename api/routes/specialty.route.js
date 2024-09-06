const express = require('express');
const router = express.Router();
const specialtyController = require('../controllers/specialty.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.authRequired([]), specialtyController.getSpecialties);

module.exports = router;