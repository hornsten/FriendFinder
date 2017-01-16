// DEPENDENCIES

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// EXPRESS CONFIGURATION

var app = express(); // Tells node that we are creating an "express" server
var PORT = 8080;

// BodyParser makes it easy for our server to interpret data sent to it.
// The code below is pretty standard.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


// ROUTER

require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);


// LISTENER

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
