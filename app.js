require('dotenv').config()
var express = require('express'), app = express(), port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var routes = require('./routes');

app.use(bodyParser.json());

app.use('/laboratories', routes.laboratories);

app.listen(port);

app.post('/', (req, res) => {console.log('reicived'); res.status(200).send()});
console.log('app listening at port: ' + port);
