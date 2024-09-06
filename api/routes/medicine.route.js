const express = require("express");
const router = express.Router();
const medicineController = require("../controllers/medicine.controller");
const authMiddleware = require('../middlewares/auth.middleware');

router.post("/", authMiddleware.authRequired(['doctor', 'sales']), medicineController.getMedicines);

router.post("/create", authMiddleware.authRequired(['sales']), medicineController.createMedicine);

router.patch("/update/:id", authMiddleware.authRequired(['sales']), medicineController.updateMedicine);

router.patch("/delete/:id", authMiddleware.authRequired(['sales']), medicineController.deleteMedicine);

module.exports = router;