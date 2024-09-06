const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    appointment: {
        require: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
    },
    patient: {
        require: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    doctor: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    result: {
        required: true,
        type: String,
    },
    note: String,
    medicines: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
    },
    status: {
        type: String,
        default: "examined",
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    updatedAt: String,
})

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema, 'medical-record');

module.exports = MedicalRecord;