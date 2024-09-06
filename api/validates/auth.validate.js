module.exports.register = async (req, res, next) => {
    if (req.body.email === '') {
        return res.json({
            code: 400,
            message: 'Email is required',
        })
    }

    if(req.body.phone === '') {
        return res.json({
            code: 400,
            message: 'Phone is required',
        })
    }

    if(req.body.password === '') {
        return res.json({
            code: 400,
            message: 'Password is required',
        })
    }

    next();
}

module.exports.login = async (req, res, next) => {
    if (req.body.user === '') {
        return res.json({
            code: 400,
            message: 'Email is required',
        })
    }

    if(req.body.password === '') {
        return res.json({
            code: 400,
            message: 'Password is required',
        })
    }

    next();
}