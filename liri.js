//import { request } from 'http'; THIS CODE APPEARED OUT OF NOWHERE I DONT REMEMBER TYPING IT????????????????????????
require('dotenv').config();

const fs = require('fs');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys = require("./keys");
var request = require('request');

// edit this
//console.log("checking if keys were imported...")
//console.log(keys);

// we'll be using keys to call our various functions
// for now lets save user inputs to "args"

var args = process.argv.slice(2); // this saves user input in an array where user input starts at 0
// console.log(args[0]); // will always print the first arg/ third argument in the terminal

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var movieData;


// Twitter bot
var myTweets = function () {
	client.get('statuses/user_timeline', limit = 20, function(error, tweets, response) {
		if (!error) {
		  // NEED TO TAKE IN "created at" and "text"
			for (i in tweets) { 
				console.log(tweets[i].text+ " TWEETED on " + tweets[i].created_at);
			};
		};
	});
}



// Spotify bot
var spotifyThis = function (song) {
	if (!song) {
		spotify.search({type: 'track', query: "The Sign Ace of Base", limit: 5 }, function (err, data) {
			if (err) {
				return console.log('Error occured: ' + err);
			};
			var search = data.tracks.items;
			for (i in search) {
				console.log("ARTIST: " + search[i].artists[0].name);
				console.log("TRACK: " + search[i].name);
				console.log("ALBUM: " + search[i].album.name);
				console.log("LINK: " + search[i].external_urls.spotify);
			};
		});
	} else {
		spotify.search({type: 'track', query: song, limit: 5}, function (err,data) {
			if (err) {
				return console.log('Error occured: ' + err);
			};
			var search = data.tracks.items;
			for (i in search) {
				console.log("ARTIST: " + search[i].artists[0].name);
				console.log("TRACK: " + search[i].name);
				console.log("ALBUM: " + search[i].album.name);
				console.log("LINK: " + search[i].external_urls.spotify);
			};
		});
	};
};


// Movie bot
var movieThis = function (movie) {
	/* movie = args.slice(1).join(" ");
	console.log(movie); */
	if (!movie) {
		request('http://www.omdbapi.com/?t=Mr.+Nobody&apikey=trilogy', function (error, response, body) {
			if (error) {
				console.log('error:', error); // Print the error if one occurred
				console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			};
			movieData = JSON.parse(body);
			console.log('TITLE: ' + movieData.Title);
			console.log('YEAR: ' + movieData.Year);
			console.log(movieData.Ratings[0])
			console.log(movieData.Ratings[1]);
			console.log('COUNTRY: ' + movieData.Country);
			console.log('LANGUAGE: ' + movieData.Language);
			console.log('PLOT: ' + movieData.Plot);
			console.log('ACTORS: ' + movieData.Actors);
		});	
	} else {
		request('http://www.omdbapi.com/?t='+movie+'&apikey=trilogy', function (error, response, body) {
			if (error) {
				console.log('error:', error); // Print the error if one occurred
				console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			};
			movieData = JSON.parse(body);
			console.log('TITLE: ' + movieData.Title);
			console.log('YEAR: ' + movieData.Year);
			console.log(movieData.Ratings[0])
			console.log(movieData.Ratings[1]);
			console.log('COUNTRY: ' + movieData.Country);
			console.log('LANGUAGE: ' + movieData.Language);
			console.log('PLOT: ' + movieData.Plot);
			console.log('ACTORS: ' + movieData.Actors);
		});
	};	
};

if (args[0] === "my-tweets") {
	// show my last 20 tweets!
	myTweets();
};

if (args[0] === "movie-this") {
	movie = args.slice(1).join(" ");
	console.log(movie);
	movieThis(movie);
};

if (args[0] === "spotify-this-song") {
	song = args.slice(1).join(" ");
	// console.log(song);
	// spotify this "song"
	spotifyThis(song);
} 

if (args[0] === "do-what-it-says") {
	var array = fs.readFileSync('random.txt', 'utf8').split(',');

	/* console.log(array); */
		/* if (array[0] === "my-tweets") {
			// show my last 20 tweets!
			myTweets();
		}; */
		
		/* if (array[0] === "movie-this") {
			movie = array[1];
			console.log(movie);
			movieThis(movie);
		}; */
		
		if (array[0] === "spotify-this-song") {
			song = array[1]
			// console.log(song);
			// spotify this "song"
			spotifyThis(song);
		}
};



