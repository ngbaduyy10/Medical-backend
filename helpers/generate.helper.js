const jwt = require("jsonwebtoken");

module.exports.jwtToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            phone: user.phone,
            userType: user.userType,
        },
        process.env.SECRET_JWT,
        {
            expiresIn: '1d'
        }
    );
};
