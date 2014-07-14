craigslister
============

search craigslist and text the url to yourself for processing later. It is a quick way to sms yourself when you see a craigslist listing that you like.


Setup Instructions
==================

First sign up with twilio, then edit the file app\config\credentials.js using your twilio account info.  After you have done so, install `craigslister` run:

	cd \path\to\craigslister
	
    npm install

    node server


Edit this line in server.js to run on a different port (optional):
    
    var port     = process.env.PORT || 3000;

  
