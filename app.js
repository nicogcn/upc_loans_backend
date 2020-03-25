require('dotenv').config()
const express = require('express'), app = express(), port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const passportStrategies = require('./config/passport-strategies')
const routes = require('./routes');
const errorHandler = require('./helpers/error');

app.use(bodyParser.json());

app.use(cors());

app.use(passport.initialize());
passport.use(passportStrategies.localLogin);
//passport.use(passportStrategies.jwt);

app.use('/auth', routes.auth)
app.use('/laboratories', routes.laboratories);
app.use('/materials', routes.materials);
app.use('/loans', routes.loans);

app.use(errorHandler)

app.listen(port);

console.log('app listening at port: ' + port);
