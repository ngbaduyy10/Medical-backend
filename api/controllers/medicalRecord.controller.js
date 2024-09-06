const MedicalRecord = require("../../models/medicalRecord.model");
const Appointment = require("../../models/appointment.model");
const dayjs = require("dayjs");

module.exports.getMedicalRecord = async (req, res) => {
    try {
        const date = req.body.date;
        if (date) {
            req.body.updatedAt = {
                $gte: dayjs(date, "DD/MM/YYYY").startOf("day").toISOString(),
                $lt: dayjs(date, "DD/MM/YYYY").endOf("day").toISOString(),
            };

            delete req.body.date;
        }

        const medicalRecord = await MedicalRecord.find(req.body)
            .populate({
                path: 'doctor',
                select: 'fullName phone specialtyId',
                populate: {
                    path: 'specialtyId',
                    select: 'name'
                }
            });
        if (medicalRecord) {
            res.json({
                code: 200,
                data: medicalRecord,
            });
        } else {
            res.json({
                code: 404,
                message: "Not found",
            });
        }
    } catch(error) {
        res.json({
            code: 400,
            message: error.message,
        });
    }
}

module.exports.createMedicalRecord = async (req, res) => {
    try {
        const appointmentId = req.body.appointment;
        const appointment = await Appointment.findById(appointmentId);
        await Appointment.updateOne({_id: appointmentId}, {isExamined: true});
        const data = {
            ...req.body,
            patient: appointment.patient,
            doctor: appointment.doctor,
        }

        const record = await new MedicalRecord(data);
        await record.save();
        res.json({
            code: 200,
            message: "Create successfully",
            data: record,
        });
    } catch(error) {
        res.json({
            code: 400,
            message: error.message,
        });
    }
}

module.exports.updateMedicalRecord = async (req, res) => {
    try {
        const id = req.params.id;
        const appointmentId = req.body.appointment;
        const appointment = await Appointment.findById(appointmentId);
        const data = {
            ...req.body,
            patient: appointment.patient,
            doctor: appointment.doctor,
        }

        await MedicalRecord.updateOne({_id: id}, data);
        res.json({
            code: 200,
            message: "Update successfully",
        });
    } catch(error) {
        res.json({
            code: 400,
            message: error.message,
        });
    }
}