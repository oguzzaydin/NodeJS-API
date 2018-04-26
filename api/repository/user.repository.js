const User = require('../schemas/user.schema');


exports.registerUser = async function(newUser) {
    const user = new User(newUser);
    console.log(newUser);
    const savedUSer = await user.save();
}