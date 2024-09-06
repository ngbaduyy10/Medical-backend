const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    participants: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})

const Meeting = mongoose.model('Meeting', meetingSchema, 'meeting');

module.exports = Meeting;