const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: { require: true, type: mongoose.Schema.Types.ObjectId, ref: "User" },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: String,
    time: String,
    purpose: String,
    status: String,
    serviceType: String,
    specialtyId: { type: mongoose.Schema.Types.ObjectId, ref: "Specialty" },
    counter: Number,
    isExamined: {
        type: Boolean,
        default: false,
    },
    deleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
})

const Appointment = mongoose.model('Appointment', appointmentSchema, 'appointment');

module.exports = Appointment;