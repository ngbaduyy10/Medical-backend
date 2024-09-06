const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware.authRequired(['sales', 'user', 'staff']), orderController.getOrders);

router.post("/create", authMiddleware.authRequired(['sales']), orderController.createOrder);

router.patch("/update/:id", authMiddleware.authRequired(['sales']), orderController.updateOrder);

module.exports = router;