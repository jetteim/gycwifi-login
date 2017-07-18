const fs = require('fs');
const http = require('http');
const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ExpressErrorHandler = require('errorhandler');
const consolere = require('console-remote-client').connect('console.re','80','gycwifi');
// Init express
const app = express();

// Set variable environment
const ENV = process.env.NODE_ENV;

// Middleware init
// Set basic error handler
ENV != 'production' ? app.use(ExpressErrorHandler()) : null;
const HttpError = require('./utils/httpError').HttpError;

const sendHttpError = require('./utils/sendHttpError');
// Set errors sender
app.use(sendHttpError);

// Set logger
require('./utils/logger')(app, ENV);

app.use(bodyParser.urlencoded({ extended: true })); // req.body
app.use(bodyParser.json());
app.use(cookieParser());

// Init template engine
app.set('view engine', 'jade');
// End Middleware

// Init static files sender
app.use(express.static(__dirname + '/public'));

// Set Routes
require('./routes')(app, config);

// Set Custom Error Handler
require('./utils/errorHandler')(app, ENV, HttpError, ExpressErrorHandler);

// Start Server
var server = http.createServer(app).listen(config.get('port'), function(){
    console.log('Express server listening on port ' + config.get('port'));
});
