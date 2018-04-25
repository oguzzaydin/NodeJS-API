const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/user.controller');
// const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');


// const {
//     listUsers,
//     createUser,
//     replaceUser,
//     updateUser
// } = require('../../validations/user.validation');

const router = express.Router();

router
    .route('/')
    .post(controller.create);

module.exports = router;