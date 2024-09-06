const express = require("express");
const router = express.Router();
const medicalRecordController = require("../controllers/medicalRecord.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware.authRequired(['user', 'doctor', 'staff']), medicalRecordController.getMedicalRecord);

router.post("/create", authMiddleware.authRequired(['doctor']), medicalRecordController.createMedicalRecord);

router.patch("/update/:id", authMiddleware.authRequired(['doctor']), medicalRecordController.updateMedicalRecord);

module.exports = router;