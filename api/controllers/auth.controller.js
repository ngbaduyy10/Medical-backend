const User = require('../../models/user.model');
const md5 = require('md5');
const generate = require('../../helpers/generate.helper');

module.exports.register = async (req, res) => {
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

    const user = await new User({
        email: req.body.email,
        phone: req.body.phone,
        password: md5(req.body.password),
        userType: "user"
    });
    await user.save();
    const newUser = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
    }
    const token = await generate.jwtToken(newUser);

    res.json({
        code: 200,
        message: 'Register successfully',
        user: newUser,
        token: token,
    })
}

module.exports.login = async (req, res) => {
    const user = await User.findOne({
        $or: [{email: req.body.user}, {phone: req.body.user}],
    }).select('id fullName email phone userType password');
    if (!user) {
        return res.json({
            code: 400,
            message: 'User not found',
        })
    }

    if (user.password === md5(req.body.password)) {
        const newUser = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            userType: user.userType,
        }
        const token = await generate.jwtToken(newUser);
        res.json({
            code: 200,
            message: 'Login successfully',
            user: newUser,
            token: token,
        })
    } else {
        res.json({
            code: 400,
            message: 'Password is incorrect',
        })
    }
}