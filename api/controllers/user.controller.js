const User = require('../../models/user.model');
const Specialty = require('../../models/specialty.model');
const md5 = require('md5');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getUsers = async (req, res) => {
    try {
        let find = {deleted: false};
        const skip = parseInt(req.body.skip);
        const limit = parseInt(req.body.limit);
        if (req.body.activeStatus) {
            find.activeStatus = req.body.activeStatus;
        }
        if (req.body.userType) {
            find.userType = req.body.userType;
        }
        if (req.body.specialtyId) {
            find.specialtyId = new ObjectId(req.body.specialtyId);
        }
        if(req.body.gender) {
            find.gender = req.body.gender;
        }

        let sort = {};
        if (req.body.sortField && req.body.sortOrder) {
            sort[req.body.sortField] = req.body.sortOrder;
        }

        if (req.body.keyword) {
            const keyword = new RegExp(req.body.keyword, 'i');
            find.$or = [
                {email: keyword},
                {fullName: keyword},
            ]
        }

        const users = await User
            .find(find)
            .select('-password')
            .populate('specialtyId', 'name description')
            .skip(skip)
            .limit(limit)
            .sort(sort);

        res.json({
            code: 200,
            data: users,
        });
    } catch(error) {
        res.json({
            code: 400,
            message: 'Get users failed',
        });
    }
}

module.exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({_id: id, deleted: false, activeStatus: true}).select('-password');
        if (user) {
            const specialty = await Specialty.find({_id: user.specialtyId});
            user.specialty = specialty.name;

            res.json({
                code: 200,
                data: user,
            })
        } else {
            res.json({
                code: 400,
                message: 'User not found',
            });
        }
    } catch (error) {
        res.json({
            code: 400,
            message: 'Get user failed',
        });
    }
}

module.exports.tempDeleteUser = async (req, res) => {
    try {
        const id = req.body.id;
        await User.updateOne({_id: id}, {deleted: true, deletedAt: new Date()});
        res.json({
            code: 200,
            message: 'Delete user successfully',
        });
    } catch (error) {
        res.json({
            code: 400,
            message: 'Delete user failed',
        });
    }
}

module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.body.id;
        await User.updateOne({_id: id}, {activeStatus: req.body.activeStatus});
        res.json({
            code: 200,
            message: 'Change status successfully',
        });
    } catch (error) {
        res.json({
            code: 400,
            message: 'Change status failed',
        });
    }
}

module.exports.createUser = async (req, res) => {
    try {
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) {
            return res.json({
                code: 400,
                message: 'Email already exists',
            })
        }

        const phoneExists = await User.findOne({ phone: req.body.phone });
        if (phoneExists) {
            return res.json({
                code: 400,
                message: 'Phone already exists',
            })
        }

        req.body.password = md5(process.env.DEFAULT_PASSWORD);
        const user = new User(req.body);
        await user.save();
        res.json({
            code: 200,
            message: 'Create user successfully',
        });
    } catch (error) {
        res.json({
            code: 400,
            message: 'Create user failed',
        });
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        const id = res.locals.userId;
        await User.updateOne({_id: id, deleted: false, activeStatus: true}, req.body);
        res.json({
            code: 200,
            message: 'Update user successfully',
        });
    } catch(error) {
        res.json({
            code: 400,
            message: 'Update user failed',
        });
    }
}