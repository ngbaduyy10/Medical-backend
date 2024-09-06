const Appointment = require('../../models/appointment.model');
const {generateTimeList} = require("../../helpers/timeList.helper");
const dayjs = require("dayjs");
const {populate} = require("dotenv");

module.exports.getUserAppointments = async (req, res) => {
    try {
        const appointments = await Appointment
            .find({ patient: res.locals.userId, deleted: false })
            .populate('doctor', 'fullName')
            .populate('specialtyId', 'name');

        if (appointments) {
            res.json({
                code: 200,
                data: appointments
            })
        } else {
            res.json({
                code: 404,
                message: 'No appointments found'
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            message: error.message
        })
    }
}

module.exports.getListAppointments = async (req, res) => {
    try {
        let find = {deleted: false}

        if (req.body.id) {
            find._id = req.body.id;
        }
        if (req.body.doctor) {
            find.doctor = req.body.doctor;
        }
        if (req.body.status) {
            find.status = req.body.status;
        }
        if (req.body.date) {
            find.date = {
                $gte: dayjs(req.body.date, "DD/MM/YYYY").startOf("day").toISOString(),
                $lt: dayjs(req.body.date, "DD/MM/YYYY").endOf("day").toISOString(),
            };
        }

        const appointments = await Appointment
            .find(find)
            .populate('patient', 'fullName phone')
            .populate('doctor', 'fullName phone')
            .populate('specialtyId', 'name');
        if (appointments) {
            res.json({
                code: 200,
                data: appointments,
            })
        } else {
            res.json({
                code: 400,
                message: 'No appointments found'
            })
        }
    } catch(error) {
        res.json({
            code: 400,
            message: error.message
        })
    }
}

module.exports.getTimeList = async (req, res) => {
    try {
        const { doctor, date } = req.body;
        const bookedTimeList = await Appointment
            .find({ doctor: doctor, date: date, deleted: false })
            .distinct('time');

        const availableTimeList = generateTimeList(date).filter(time => !bookedTimeList.includes(time));

        res.json({
            code: 200,
            data: availableTimeList
        })

    } catch (error) {
        res.json({
            code: 400,
            message: error.message
        })
    }
}

module.exports.createAppointment = async (req, res) => {
    try {
        req.body.patient = res.locals.userId;
        req.body.status = 'booked';
        const appointment = await new Appointment(req.body);
        await appointment.save();

        res.json({
            code: 200,
            message: 'Appointment created successfully'
        })

    } catch (error) {
        res.json({
            code: 400,
            message: error.message
        })
    }
}

module.exports.updateAppointment = async(req, res) => {
    try {
        const {id} = req.params;
        const appointment = await Appointment.findById(id);
        console.log(appointment.patient.toString());
        if (appointment) {
            if (res.locals.userId === appointment.patient.toString()) {
                await Appointment.updateOne({_id: id}, {$set: req.body});
                res.json({
                    code: 200,
                    message: 'Appointment updated successfully'
                })
            } else {
                res.json({
                    code: 400,
                    message: 'No permission'
                })
            }
        } else {
            res.json({
                code: 400,
                message: 'Appointment not found'
            })
        }
    } catch(error) {
        res.json({
            code: 400,
            message: error.message
        })
    }

}

module.exports.deleteAppointment = async (req, res) => {
    try {
        const {id} = req.body;
        const appointment = await Appointment.findById(id);
        if (appointment) {
            if (res.locals.userId === appointment.patient.toString()) {
                await Appointment.updateOne({_id: id}, {deleted: true});
                res.json({
                    code: 200,
                    message: 'Appointment deleted successfully'
                })
            } else {
                res.json({
                    code: 400,
                    message: 'No permission'
                })
            }
        } else {
            res.json({
                code: 400,
                message: 'Appointment not found'
            })
        }
    } catch(error) {
        res.json({
            code: 400,
            message: error.message
        })
    }
}

module.exports.updateStatusAppointment = async (req, res) => {
    try {
        const {id, status} = req.body;
        await Appointment.updateOne({_id: id}, {status: status});
        res.json({
            code: 200,
            message: 'Appointment status updated successfully'
        })
    } catch(error) {
        res.json({
            code: 400,
            message: error.message
        })
    }
}