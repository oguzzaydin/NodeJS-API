const User = require('../schemas/user.schema');
const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(128).required(),
});

exports.userSchema = userSchema;