const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware.authRequired(['user']), appointmentController.getUserAppointments);

router.post("/", authMiddleware.authRequired(['doctor', 'staff']), appointmentController.getListAppointments);

router.post("/time-list", authMiddleware.authRequired(['user']), appointmentController.getTimeList);

router.post('/create', authMiddleware.authRequired(['user']), appointmentController.createAppointment);

router.patch('/update/:id', authMiddleware.authRequired(['user']), appointmentController.updateAppointment);

router.patch('/delete', authMiddleware.authRequired(['user']), appointmentController.deleteAppointment);

router.patch('/update-status', authMiddleware.authRequired(['doctor', 'staff']), appointmentController.updateStatusAppointment);

module.exports = router;