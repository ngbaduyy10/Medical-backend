const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    },
    activeStatus: {
        type: Boolean,
        default: true,
    },
    userType: {
        type: String,
        required: true,
    },
    birthday: Date,
    address: String,
    note: String,
    gender: String,
    photo: String,
    totalBooked: Number,
    specialtyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialty',
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema, 'user');

module.exports = User;