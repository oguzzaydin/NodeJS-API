const httpStatus = require('http-status');
const userRepository = require('../repository/user.repository');



exports.create = (req, res, next) => {

    if (!req.body) {
        res.json({
            success: false,
            message: 'User not found in controller create message'
        });
    } else {
        try {
            res.status(httpStatus.CREATED);
            next(userRepository.registerUser(req.body));
        } catch (error) {
            res.json({
                error: error.message,
                info: 'user catch blog erorr'
            });
        }
    }

}