const Specialty = require('../../models/specialty.model');

module.exports.getSpecialties = async (req, res) => {
    try {
        const specialties = await Specialty.find();
        res.json({
            code: 200,
            data: specialties,
        });
    } catch(error) {
        res.json({
            code: 400,
            message: 'Get specialties failed',
        });
    }
}