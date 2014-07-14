var express = require('express');
var fs = require('fs');
var request = require('request');
var app     = express();
var port     = process.env.PORT || 3000;
var path     = require('path');
var log      = require('./app/libs/log')(module);
var configDB = require('./app/config/database');
var mongoose = require('mongoose');

app.configure(function() {
	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms
	app.use(express.json());       // to support JSON-encoded bodies
	app.use(express.urlencoded()); // to support URL-encoded bodies
	app.set('view engine', 'ejs'); // set up ejs for templating
	app.use(express.static(path.join(__dirname, 'public')));
});

// routes ======================================================================
var uristring = configDB.url;
mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});
require('./app/routes.js')(app); 

app.listen(port)

console.log('running on http://localhost:8081');

exports = module.exports = app;
