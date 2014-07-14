// app/routes.js
var log           = require('./libs/log')(module);
var twilio = require('twilio');
var craigslist = require('node-craigslist');
var request = require('Request');
var mongoose = require('mongoose')
  , CraigslistModel = require('./models/craigslist').Craigslist;
var twilioConfig = require('./config/credentials');


var sendText = function(msg){
	// Pass in parameters to the REST API using an object literal notation. The
	// REST client will handale authentication and response serialzation for you.
	var client = new twilio.RestClient(twilioConfig.twilio.accountSid, twilioConfig.twilio.authToken);
	client.messages.create({
		to:twilioConfig.twilio.phone,
			from:twilioConfig.twilio.twiliophone,
			body:msg
	}, function(error, message) {
		// The HTTP request to Twilio will run asynchronously. This callback
		// function will be called when a response is received from Twilio
		// The "error" variable will contain error information, if any.
		// If the request was successful, this value will be "falsy"
		if (!error) {
			// The second argument to the callback will contain the information
			// sent back by Twilio for the request. In this case, it is the
			// information about the text messsage you just sent:
			console.log('Success! The SID for this SMS message is:');
			console.log(message.sid);
	 
			console.log('Message sent on:');
			console.log(message.dateCreated);
		} else {
			console.log('Oops! There was an error.');
		}
	});
}


// request module is used to process the yql url and return the results in JSON format


module.exports = function(app) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	app.post('/sms', function(req, res) {
		console.log(req.body.url);
		sendText(req.body.url);
		res.send({"success":true});
	});

	app.get('/searching', function(req, res){
		// input value from search
		var val = req.query.search;
		console.log('searching for',val);
		client = craigslist({
			city : 'newyork'
		  }),
		  options = {
			maxAsk : '2000',
			minAsk : '1500'
		  };
		
		client.search(options, val, function (err, listings) {
		  listings.forEach(function (listing) {
			console.log(listing);
			/*var cl_listing = new CraigslistModel({pid:listing.pid,
			 category: listing.category,
			  date:Date.now(),
			  hasPic:listing.hasPic,
			  location: listing.location,
			  price: listing.price,
			  title: listing.title,
			  url:  listing.url,
			  textSent: false});
			cl_listing.save(function (err) {
				//if (err) console.log ('Error on save!',err);
			});*/
		  });
		  res.send(listings);
		});
		
	});
	

};
