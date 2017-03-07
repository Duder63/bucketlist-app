var cors = require('cors');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var router = require('./router');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:bucket/bucket');

app.use(cors());

app.use(bodyParser.json({ type: '*/*'}));
router(app);

var port = process.env.PORT || 3000;

var server = http.createServer(app);

server.listen(port);
console.log('Server listening on ' + port);

