const User = require('../schemas/user.schema');


exports.registerUser = async function(newUser) {
    const user = new User(newUser);
    console.log(newUser);
    const savedUSer = await user.save((err) => {
        if (err) {
            if (err.code === 11000) {
                console.log({
                    success: false,
                    message: 'User aldready exist in db'
                });
            }
        }
    });
}