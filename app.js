require('dotenv').config()
var express = require('express'), app = express(), port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var routes = require('./routes');

app.use(bodyParser.json());

app.use('/laboratories', routes.laboratories);
app.use('/materials', routes.materials);
app.use('/loans', routes.loans);

app.listen(port);

console.log('app listening at port: ' + port);
