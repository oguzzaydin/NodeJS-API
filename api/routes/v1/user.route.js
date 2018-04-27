const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/user.controller');
const userModel = require('../../models/user.model');
const Joi = require('joi');
const expressJoiMiddleware = require('express-joi-middleware');
const option = require('../../validations/validation.option');





const router = express.Router();

router
    .route('/')
    .post(expressJoiMiddleware(userModel.userCreateModel, option.options), (req, res, next) => {
        res.json(req.validated.error);
        next();
    }, controller.create);



module.exports = router;