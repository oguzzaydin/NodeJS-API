const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');
const jwt = require('jwt-simple');
const moment = require('moment-timezone');
const Validator = require('../validations/user.validator');

const roles = ['user', 'admin'];
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: Validator.EmailValidators
    },
    password: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: Validator.PasswordValidators
    }


});

userSchema.pre('save', async function save(next) {
    try {
        if (!this.isModified('password')) return next();

        const rounds = env === 'test' ? 1 : 10;

        const hash = await bcrypt.hash(this.password, rounds);
        this.password = hash;


        return next();

    } catch (error) {
        return next(error);
    }
});

userSchema.method({
    transform() {
        const transformed = {};
        const fields = ['id', 'email', 'password'];

        fields.forEach((field) => {
            transformed[field] = this[field];
        });

        return transformed;
    },

    token() {
        const payload = {
            exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
            iat: moment().unix(),
            sub: this._id,
        }
        return jwt.encode(payload, jwtSecret);
    },

    async passwordMatches(password) {
        return bcrypt.compare(password, this.password);
    },



});

userSchema.statics = {
    roles,
    checkDuplicateEmail(error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            return new APIError({
                message: 'Validation Error',
                errors: [{
                    field: 'email',
                    location: 'body',
                    messages: ['"email" already exists'],
                }],
                status: httpStatus.CONFLICT,
                isPublic: true,
                stack: error.stack,
            });
        }
        return error;
    }
}

module.exports = mongoose.model('User', userSchema);