const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    totalQuantity: {
        type: Number,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    usage: {
        type: String,
    },
    note: {
        type: String,
    },
    description: {
        type: String,
        require: true,
    },
    outOfPill: Boolean,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {
    timestamps: true,
})

const Medicine = mongoose.model('Medicine', medicineSchema, 'medicine');

module.exports = Medicine;