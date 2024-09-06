const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true,
    },
    medicalRecord: {
        require: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "MedicalRecord",
    },
    sales: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    patient: {
        require: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    medicines: {
        type: [mongoose.Schema.Types.Mixed],
        required: true,
        default: [],
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    note: String,
    status: {
        type: String,
        default: "pending",
    },
    paymentMethod: {
        type: String,
        default: "cash",
    },
}, {
    timestamps: true,
})

const Order = mongoose.model('Order', orderSchema, 'order');

module.exports = Order;