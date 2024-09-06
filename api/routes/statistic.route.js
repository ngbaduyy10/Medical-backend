const express = require('express');
const router = express.Router();
const statisticController = require('../controllers/statistic.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware.authRequired(['sales']), statisticController.getStatistic);

module.exports = router;