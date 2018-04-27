const httpStatus = require('http-status');
const User = require('../schemas/user.schema');
const RefreshToken = require('../schemas/refreshToken.schema');
const moment = require('moment-timezone');
const { jwtExpirationInterval } = require('../../config/vars');


function generateTokenResponse(user, accessToken) {
    const tokenType = 'Bearer';
    const refreshToken = RefreshToken.generate(user).token;
    const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
    return {
        tokenType,
        accessToken,
        refreshToken,
        expiresIn,
    };
}

exports.register = async(req, res, next) => {
    try {
        const user = await (new User(req.body)).save();
        const userTransformed = user.transform();
        const token = generateTokenResponse(user, user.token());
        res.status(httpStatus.CREATED);
        return res.json({ token, user: userTransformed });
    } catch (error) {
        return next(User.checkDuplicateEmail(error));
    }
};