const Joi = require('joi');

exports.validateBody = (schema) => {

    return (req, res, next) => {
        const result = Joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json(result.error);
        } else {
            if (!req['value']) {
                req['value'] = {};
            }
            if (!req['value']['body']) {
                req['value']['body'] = {};
            }
            req['value']['body'] = result.value;
            next();
        }
    }

}