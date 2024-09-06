const Medicine = require('../../models/medicine.model');

module.exports.getMedicines = async (req, res) => {
    try {
        let find = {deleted: false};
        const skip = parseInt(req.body.skip);
        const limit = parseInt(req.body.limit);
        if (req.body.keyword) {
            find.name = new RegExp(req.body.keyword, 'i');
        }
        if (req.body.usage) {
            find.usage = req.body.usage;
        }

        const medicines = await Medicine.find(find).skip(skip).limit(limit);

        res.json({
            code: 200,
            data: medicines,
        });
    } catch(error) {
        res.json({
            code: 400,
            message: 'Get medicines failed',
        });
    }
}

module.exports.createMedicine = async (req, res) => {
    try {
        const medicineExist = await Medicine.findOne({name: req.body.name});
        if (medicineExist) {
            res.json({
                code: 400,
                message: 'Medicine already exists',
            });
        } else {
            const medicine = await new Medicine(req.body);
            await medicine.save();

            res.json({
                code: 200,
                message: 'Create medicine successfully',
            });
        }
    } catch(error) {
        res.json({
            code: 400,
            message: 'Create medicine failed',
        });
    }
}

module.exports.updateMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findOne({_id: req.params.id, deleted: false});
        if (medicine) {
            await Medicine.updateOne({_id: req.params.id}, req.body);

            res.json({
                code: 200,
                message: 'Update medicine successfully',
            });
        } else {
            res.json({
                code: 400,
                message: 'Medicine not found',
            });
        }
    } catch(error) {
        res.json({
            code: 400,
            message: 'Update medicine failed',
        });
    }
}

module.exports.deleteMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findOne({_id: req.params.id, deleted: false});
        if (medicine) {
            await Medicine.updateOne({_id: req.params.id}, {deleted: true, deletedAt: new Date()});
            res.json({
                code: 200,
                message: 'Delete medicine successfully',
            });
        } else {
            res.json({
                code: 400,
                message: 'Medicine not found',
            });
        }
    } catch(error) {
        res.json({
            code: 400,
            message: 'Delete medicine failed',
        });
    }
}