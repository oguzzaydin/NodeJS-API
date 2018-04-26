function UserModel(user) {
    email: user.email;
    password: user.password;
}

function createUser(user) {
    return new UserModel(user);



}

module.exports.createUser = createUser;