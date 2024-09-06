const jwt = require('jsonwebtoken');

module.exports.authRequired = (userTypeArray) => {
    return (req, res, next) => {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
                if (err) {
                    res.json({
                        code: 401,
                        message: err.message,
                    })
                } else {
                    if (userTypeArray.length === 0 || userTypeArray.includes(decoded.userType)) {
                        res.locals.userId = decoded.id;
                        next();
                    } else {
                        res.json({
                            code: 400,
                            message: 'No permission',
                        })
                    }
                }
            });
        } else {
            res.json({
                code: 400,
                message: 'Please login',
            })
        }
    }
}