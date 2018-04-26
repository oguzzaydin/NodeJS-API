const httpStatus = require('http-status');
const userRepository = require('../repository/user.repository');



exports.create = async(req, res, next) => {

    if (!req.body.email) {
        res.json({ success: false, message: 'You must provide an e-mail' });
    } else {
        if (!req.body.password) {
            res.json({ success: false, message: 'You must provide a password' });
        } else {
            const user = req.body;
            userRepository.registerUser(user);
        }
    }

}