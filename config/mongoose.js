const mongoose = require('mongoose');
const { mongo, env } = require('./vars');

mongoose.Promise = Promise;

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

if (env === 'development') {
    mongoose.set('debug', true);
}



exports.connect = () => {
    mongoose.connect(mongo.uri, {
        keepAlive: 1,
    });
    console.log('mongodb start connection');
    return mongoose.connection;
};