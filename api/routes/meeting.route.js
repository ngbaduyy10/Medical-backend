const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meeting.controller");
const authMiddleware = require('../middlewares/auth.middleware');

router.post("/", authMiddleware.authRequired(['doctor']), meetingController.getMeetings);

router.post("/create", authMiddleware.authRequired(['doctor']), meetingController.createMeeting);

router.patch("/update/:id", authMiddleware.authRequired(['doctor']), meetingController.updateMeeting);

router.patch("/delete/:id", authMiddleware.authRequired(['doctor']), meetingController.deleteMeeting);

module.exports = router;