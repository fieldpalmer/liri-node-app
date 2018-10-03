// https://www.npmjs.com/package/axios
// http://www.omdbapi.com/
// https://app.swaggerhub.com/apis/Bandsintown/PublicAPI/3.0.0#/artist%20events/artistEvents
// http://www.artists.bandsintown.com/bandsintown-api
// https://www.npmjs.com/package/moment
// https://www.npmjs.com/package/dotenv
// https://developer.spotify.com/documentation/web-api/libraries/

require("dotenv").config(); // read and set environment variables with the dotenv package

var keys = require("./keys.js"); // access API keys
var Spotify = require('node-spotify-api');
var axios = require("axios");


//node liri.js concert-this <artist/band name here>
    //search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) 
    // for an artist and render the following information about each event to the terminal:
    //  * Name of the venue
    //  * Venue location
    //  * Date of the Event (use moment to format this as "MM/DD/YYYY")

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(response) {
        console.log(response.data.venue.name);
        console.log(response.data.venue.city);
        console.log(response.data.datetime);
    });


//node liri.js spotify-this-song <song name here>
    // * This will show the following information about the song in your terminal/bash window
        // * Artist(s)
        // * The song's name
        // * A preview link of the song from Spotify
        // * The album that the song is from
        // * If no song is provided then your program will default to "The Sign" by Ace of Base.
    // * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to 
    //   retrieve song information from the Spotify API.
        // (https://www.npmjs.com/package/node-spotify-api).


    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: 'All the Small Things' }).then(function(response) {
        console.log(response.data.artist);
        console.log(response.data.track);
        console.log(response.data.album);
    }).catch(function(err) {
        console.log(err);
    });


//node liri.js movie-this <movie name here>
    // This will output the following information to your terminal/bash window:

    // * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// * You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API 
//   requires an API key. You may use `trilogy`.

    axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(function(response) {
        console.log("Title: " + response.data.Title);
        console.log("Released: " + response.data.Released);
        console.log("IMDB Rating: " + response.data.Ratings["Internet Movie Database"]);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings["Rotten Tomatoes"]);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    });


//node liri.js do-what-it-says`
    // * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    // * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
    // * Edit the text in random.txt to test out the feature for movie-this and my-tweets


// ### BONUS
    // * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
    // * Make sure you append each command you run to the `log.txt` file. 
    // * Do not overwrite your file each time you run a command.