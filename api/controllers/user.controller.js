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
            userRepository.registerUser(req.body, (error, result) => {

                if (error) {

                    res.send({ "error": error });

                } else {

                    res.send({ "success": "success" });
                }
            });
        } catch (error) {
            res.json({
                error: error.message,
                info: 'user catch blog erorr'
            });
        }
    }

}