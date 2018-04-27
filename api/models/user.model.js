const Joi = require('joi');

const userCreateModel = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(128).required(),
    }
}




exports.userCreateModel = userCreateModel;