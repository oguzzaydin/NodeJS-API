const User = require('../schemas/user.schema');


exports.registerUser = function(newUser, callback) {

    try {
        const user = new User(newUser);
        User.create(user, callback);
    } catch (error) {
        next(User.checkDuplicateEmail(error));
    }


}