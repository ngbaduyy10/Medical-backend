const mongoose = require('mongoose');

const specialtySchema = new mongoose.Schema({
    name : String,
    description : String,
}, {
    timestamps: true,
})

const Specialty = mongoose.model('Specialty', specialtySchema, 'specialty');

module.exports = Specialty;