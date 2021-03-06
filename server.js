// DEPENDENCIES

var express = require('express');
var favicon = require('express-favicon');
var bodyParser = require('body-parser');
var path = require('path');

// EXPRESS CONFIGURATION

var app = express(); // Tells node that we are creating an "express" server

app.use(express.static(__dirname + '/public'));
var PORT = process.env.PORT || 8080;

// BodyParser makes it easy for our server to interpret data sent to it.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(favicon(__dirname + '/app/public/favicon.png'));
app.use(express.static(__dirname + '/app/public'));


// ROUTER

require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

// LISTENER

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
