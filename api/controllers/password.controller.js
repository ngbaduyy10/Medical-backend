const md5 = require('md5');
const User = require('../../models/user.model');

module.exports.changePassword = async (req, res) => {
    try {
        const id = res.locals.userId;
        const user = await User.findOne({ _id: id, deleted: false, activeStatus: true });
        if (user.password === md5(req.body.oldPassword)) {
            await User.updateOne({ _id: id }, { password: md5(req.body.password) });
            res.json({
                code: 200,
                message: 'Change password successfully',
            });
        } else {
            res.json({
                code: 400,
                message: 'Old password is incorrect',
            });
        }
    } catch {
        res.json({
            code: 400,
            message: 'Change password failed',
        });
    }
}