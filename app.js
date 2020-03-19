require('dotenv').config()
var express = require('express'), app = express(), port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var routes = require('./routes');
var cors = require('cors')

app.use(bodyParser.json());

app.use(cors());

app.use('/auth', routes.auth)
app.use('/laboratories', routes.laboratories);
app.use('/materials', routes.materials);
app.use('/loans', routes.loans);

app.listen(port);

console.log('app listening at port: ' + port);
