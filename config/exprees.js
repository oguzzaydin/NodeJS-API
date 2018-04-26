const express = require('express'); // express module
const morgan = require('morgan'); // server log on console
const bodyParser = require('body-parser'); //JSON response parse
const compress = require('compression'); // Middleware options
const methodOverride = require('method-override'); //Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
const cors = require('cors'); //Middleware create
const helmet = require('helmet') // HTTP header security module
const passport = require('passport'); //Kimlik doğrulaması
const routes = require('../api/routes/v1');

const app = express();


// request logging dev: console
//app.use(morgan(logs));


app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/v1', routes);

app.use(cors());
app.use(methodOverride());
app.use(helmet());
app.use(cors());
app.use(passport.initialize());
// app.use(error.converter);
// app.use(error.notFound);
// app.use(error.handler);


module.exports = app;