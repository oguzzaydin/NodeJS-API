const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');
const Validator = require('../validations/user.validator');











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
    }
});

module.exports = mongoose.model('User', userSchema);