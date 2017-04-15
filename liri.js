var key = require("./key.js");

var Twitter = require("twitter");

var Spotify = require("spotify");

var request = require("request");

var fs = require("fs");

var client = new Twitter ({
	
	consumer_key: key.twitterKeys.consumer_key,
  	consumer_secret: key.twitterKeys.consumer_secret,
  	access_token_key: key.twitterKeys.access_token_key,
  	access_token_secret: key.twitterKeys.access_token_secret
})

console.log(key.twitterKeys.consumer_key);
console.log(key.twitterKeys.consumer_secret);
console.log(key.twitterKeys.access_token_key);
console.log(key.twitterKeys.access_token_secret);

var command = process.argv[2];
var input = process.argv[3];

switch (command){

	case "my-tweets":
	myTweets();
	break;

	case "spotify-this-song":
	spotifyThis();
	break;

	case "movie-this":
	movieThis();
	break;

	case "do-what-it-says":
	doIt();
	break;
}

function myTweets (){

	client.get("statuses/user_timeline", {screen_name: "ana_goodwin10", count: "20"}, function(error, tweets, response) {
	  if(error) throw error;
	  console.log(tweets);  // The favorites. 
	   // Raw response object. 
	});

}

function movieThis(){
	if(input===undefined){
		input="Mr. Nobody"

	var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&r=json";


// This line is just to help us debug against the actual URL.
console.log(queryUrl);
request(queryUrl, function(error, response, body) {

  // If the request was successful...
  if (!error && response.statusCode === 200) {

  	console.log( "Request successful!");
    // Then log the body from the site!
    console.log(response);
    console.log(JSON.parse(body).Title);
    console.log(JSON.parse(body).Year);
    console.log(JSON.parse(body).imdbRating);
    console.log(JSON.parse(body).Country);
    console.log(JSON.parse(body).Language);
    console.log(JSON.parse(body).Plot);
    console.log(JSON.parse(body).Actors);
  }
});


	}else{
	var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&r=json";


// This line is just to help us debug against the actual URL.
console.log(queryUrl);
request(queryUrl, function(error, response, body) {

  // If the request was successful...
  if (!error && response.statusCode === 200) {

  	console.log( "Request successful!");
    // Then log the body from the site!
    console.log(response);
    console.log(JSON.parse(body).Title);
    console.log(JSON.parse(body).Year);
    console.log(JSON.parse(body).imdbRating);
    console.log(JSON.parse(body).Country);
    console.log(JSON.parse(body).Language);
    console.log(JSON.parse(body).Plot);
    console.log(JSON.parse(body).Actors);
  }
});
}
}

function doIt(){
	fs.readFile("random.txt", "utf-8", function(err, data){
		data = data.split(",");
		console.log(data);
		command = data[0];

		console.log(command);
		input = data[1];
		console.log(input);

	switch (command){

	case "my-tweets":
	myTweets();
	break;

	case "spotify-this-song":
	spotifyThis();
	break;

	case "movie-this":
	movieThis();
	break;

	case "do-what-it-says":
	doIt();
	break;
}

	})
}

function spotifyThis(){
	
	if(input === undefined){
		Spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
   		 if ( err ) {
        	console.log('Error occurred: ' + err);
       		 return;
    	}
 
 	console.log(data);
 	console.log("Artist: " + data.tracks.items[3].artists[0].name);
 	console.log("Preview: " + data.tracks.items[3].preview_url);
 	console.log("Track name: " + data.tracks.items[3].name);
 	console.log("Album name: " + data.tracks.items[3].album.name);
 	})

	
	}else{
	Spotify.search({ type: 'track', query: input }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
 	console.log(data);
 	console.log("Artist: " + data.tracks.items[0].artists[0].name);
 	console.log("Preview: " + data.tracks.items[0].preview_url);
 	console.log("Track name: " + data.tracks.items[0].name);
 	console.log(data.tracks.items[0].album.name);
 })
}
    // Do something with 'data' 

}