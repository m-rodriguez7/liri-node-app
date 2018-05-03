require('dotenv').config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys = require("./keys"); // edit this
//console.log("checking if keys were imported...")
console.log(keys);

// we'll be using keys to call our various functions
// for now lets save user inputs to "args"

var args = process.argv.slice(2); // this saves user input in an array where user input starts at 0
// console.log(args[0]); // will always print the first arg/ third argument in the terminal

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var songdata, twats

if (args[0] === "my-tweets") {
	// show my last 20 tweets!
	client.get('statuses/user_timeline', function(error, tweets, response) {
  		if (!error) {
			twats = tweets;
			// NEED TO TAKE IN "created at" and "text"
  		}
	});
} else if (args[0] === "spotify-this-song") {
	song = args[1];
	// spotify this "song"
	if (!song) {
		spotify.search({type: 'track', query: "The Sign", limit: 1 }, function (err, data) {
			if (err) {
				return console.log('Error occured: ' + err);
			};
			console.log(JSON.stringify(data, null,4));
		});
	} else {
		spotify.search({type: 'track', query: song, limit: 1}, function (err,data) {
			if (err) {
				return console.log('Error occured: ' + err);
			};
			console.log(data);
		});
	};
	

	
};


