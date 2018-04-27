//========================================= CHECKERS ==========================================
//======Email checkers=======
let emailLenghtChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 30) {
            return false;
        } else {
            return true;
        }
    }
};

let validEmailChecker = (email) => {
    if (!email) {
        return false;
    } else {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email); // Returns true or false
    }
};



//======Password Checkers============
let passwordLengthChecker = (password) => {
    if (!password) {
        return false;
    } else {
        if (password.length < 8 || password.length > 35) {
            return false;
        } else {
            return true;
        }
    }
};

let validPasswordChecker = (password) => {
    if (!password) {
        return false;
    } else {
        // const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        // return regExp.test(password);
    }
};

//====================================================== VALIDATORS ==================================
//====Email validators====
const EmailValidators = [{
    validator: emailLenghtChecker,
    message: 'Email must be at least 5 characters but no more than 30'
}, {
    validator: validEmailChecker,
    message: 'Must be a valid e-mail'
}];



//====Password validators=====
const PasswordValidators = [{
    validator: passwordLengthChecker,
    message: 'Password must be at least 8 characters but no more than 35'
}, {
    validator: validPasswordChecker,
    message: 'Must have at least one uppercase, lowercase, special character, and number'
}];


module.exports = { EmailValidators, PasswordValidators };