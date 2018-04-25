const httpStatus = require('http-status');
const expressValidation = require('express-validation'); // middleware error check npm module
const APIError = require('../utils/APIerror');
const { env } = require('../../config/vars');


const handler = (err, req, res, next) => {

    const response = {
        code: err.status,
        message: err.message || httpStatus[err.status],
        stack: err.stack
    };

    if (env !== 'development') {
        delete response.stack;
    }

    res.status(err.status);
    res.json(response);
    res.end();

};
exports.handler = handler;



exports.converter = (err, req, res, next) => {

    let convertedError = err;

    if (err instanceof expressValidation.ValidationError) {

        convertedError = new APIError({
            message: 'Error the Validation',
            errors: err.errors,
            status: err.status,
            stack: err.stack
        });
    } else if (!(err instanceof APIError)) {
        convertedError = new APIError({
            message: err.message,
            status: err.status,
            stack: err.stack,
        });
    }
    return handler(convertedError, req, res);
};


exports.notFound = (req, res, next) => {
    const err = new APIError({
        message: 'Not Found',
        status: httpStatus.NOT_FOUND
    });
    return handler(err, req, res);

}