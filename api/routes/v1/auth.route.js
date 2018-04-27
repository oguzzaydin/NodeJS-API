const express = require('express');
const expressJoiMiddleware = require('express-joi-middleware');
const controller = require('../../controllers/auth.controller');
const { login, register, refresh } = require('../../models/auth.model');
const option = require('../../validations/validation.option');

const router = express.Router();


router.route('/register')
    .post(expressJoiMiddleware(register, option.options), (req, res, next) => {
        if (req.validated.error) {
            res.json(req.validated.error)
        } else {
            next();
        }
    }, controller.register);


module.exports = router;