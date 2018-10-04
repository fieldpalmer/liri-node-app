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

// switch statement to determine user request method
var operator = process.argv[2];
switch (operator) {
    case 'concert-this':
        searchBandsInTown();
        break;
    case 'spotify-this-song':
        searchSpotify();
        break;
    case 'movie-this':
        searchOMDB();
        break;    
    case 'do-what-it-says':
        obeyText();
        break;
    default:
        console.log("you've got an error dude");
}

//node liri.js concert-this <artist/band name here>
const searchBandsInTown = () => {
    var artist = process.argv[3];
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response) {
            console.log(response.data.venue.name);  //  * Name of the venue
            console.log(response.data.venue.city); //  * Venue location
            console.log(response.data.datetime);  //  * Date of the Event (use moment to format this as "MM/DD/YYYY")
        },
        function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
        }
    );
}

//node liri.js spotify-this-song <song name here>
const searchSpotify = () => {
    let songQuery = process.argv[3];
    let spotify = new Spotify(keys.spotify);
    // * This will show the following information about the song in your terminal/bash window
    spotify.search({ type: 'track', query: songQuery }).then(function(response) {
        console.log(response.data.artist);   // * Artist(s)
        console.log(response.data.track);   // * The song's name
        // * A preview link of the song from Spotify
        console.log(response.data.album);  // * The album that the song is from
    }).catch(function(err) {
        // * If no song is provided then your program will default to "The Sign" by Ace of Base.

        console.log(err);
    });
}

//node liri.js movie-this <movie name here>

const searchOMDB = () => {
    axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
        function(response) {
            // This will output the following information to your terminal/bash window:
            console.log("Title: " + response.data.Title);
            console.log("Released: " + response.data.Released);
            console.log("IMDB Rating: " + response.data.Ratings["Internet Movie Database"]);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings["Rotten Tomatoes"]);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        },
        function (error) {
        // * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
        }
    );
}

//node liri.js do-what-it-says`
    // * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    // * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
    // * Edit the text in random.txt to test out the feature for movie-this and my-tweets


// ### BONUS
    // * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
    // * Make sure you append each command you run to the `log.txt` file. 
    // * Do not overwrite your file each time you run a command.