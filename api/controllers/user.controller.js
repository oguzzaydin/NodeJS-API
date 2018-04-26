const httpStatus = require('http-status');
const User = require('../schemas/user.schema');
const validation = require('../validations/user.validation');
const createUser = require('../models/user.model');


exports.create = async(req, res, next) => {
    const user = new User(req.body);
    const savedUSer = await user.save((err) => {
        if (err) {
            // Check if error is an error indicating duplicate account
            if (err.code === 11000) {
                res.json({ success: false, message: 'Username or e-mail already exists' }); // Return error
            } else {
                // Check if error is a validation rror
                if (err.errors) {
                    // Check if validation error is in the email field
                    if (err.errors.email) {
                        res.json({ success: false, message: err.errors.email.message }); // Return error
                    } else {
                        // Check if validation error is in the username field
                        if (err.errors.username) {
                            res.json({ success: false, message: err.errors.username.message }); // Return error
                        } else {
                            // Check if validation error is in the password field
                            if (err.errors.password) {
                                res.json({ success: false, message: err.errors.password.message }); // Return error
                            } else {
                                res.json({ success: false, message: err }); // Return any other error not already covered
                            }
                        }
                    }
                } else {
                    res.json({ success: false, message: 'Could not save user. Error: ', err }); // Return error if not related to validation
                }
            }
        } else {
            res.json({ success: true, message: 'Acount registered!' }); // Return success
        }
    });
}