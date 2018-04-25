const httpStatus = require('http-status');
const User = require('../models/user.model');


// exports.get = (req, res) => res.json(req.locals.user.transform());

// exports.create = async(req, res, next) => {
//     try {
//         const user = new User(req.body);
//         const savedUser = await user.save();
//         res.status(httpStatus.CREATED);
//         res.json(savedUser.transform());
//     } catch (error) {
//         console.log('error create');
//     }
// }

exports.create = async(req, res, next) => {
    res.send('ASda');


};