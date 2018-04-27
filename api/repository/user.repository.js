const User = require('../schemas/user.schema');


exports.registerUser = function(newUser, callback) {
    const user = new User(newUser);
    User.create(user, callback);

}