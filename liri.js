//read & set environment variables
require('dotenv').config();
//import api keys
const keys = require('./keys.js');
//import spotify npm package
const Spotify = require('node-spotify-api');
//import axios
const axios = require('axios');
//import file system package
const fs = require('fs');
//import moment js
const moment = require('moment');

//istantiate spotify api client with out secret info
let spotify = new Spotify(keys.spotify);

// Helper function that gets the artist name
const getArtists = function(artist) {
    return artist.name;
};

// node liri.js spotify-this-song <song name>
const searchSpotify = (songName) => {
    //search error default
    if (songName === undefined) {
        songName = "What's my age again";
    }

    spotify.search({
        type: 'track',
        query: songName,
    },
    function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songs = data.tracks.items;
        //loop through returned spotify data to display song info
        for (var i = 0 ; i < songs.length ; i++) {
            console.log(" ----------- Song #" + (i+1) + "------------");
            console.log("Song Name: " + songs[i].name);
            console.log("Artist: " + songs[i].artists.map(getArtists));
            console.log("Album: " + songs[i].album.name);
            console.log("Preview Link: " + songs[i].preview_url);
            console.log("************************************");
        }
    });
};

//node liri.js concert-this <artist/band name>
const searchBandsInTown = (bandName) => {

    let queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function(response) {
            if (!response.data.length) {
                console.log("Sorry, nothing found!");
            }

            console.log("Concerts coming up for " + bandName +":")
            for( var i = 0 ; i < response.data.length ; i++) {
                let name = response.data[i].venue.name;
                let city = response.data[i].venue.city;
                let country = response.data[i].venue.country;
                let region = response.data[i].venue.region;
                let date = moment(response.data[i].datetime).format("MM/DD/YYYY");

                console.log("Venue Info ************************");
                console.log("Venue Name: " + name);
                console.log("City: " + city);
                console.log("Country: " + country);
                console.log("Time: " + region);
                console.log("Date: " + date);
            }
        }
    )
};

//node liri.js movie-this <movie name here>
const searchOMDB = (movieName) => {
    //default error 
    if (movieName === undefined) {
        movieName = "Mr. Nobody";
    }
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = 'http://www.omdbapi.com/?apikey=trilogy&t=' + movieName + "&y=&plot=full&tomatoes=true";

    axios
        .get(queryUrl)
        .then(function(response) {
            // This will output the following information to your terminal/bash window:
            console.log("Title: " + response.data.Title);
            console.log("Released: " + response.data.Released);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        },
    )
};

//node liri.js do-what-it-says
const obeyText = () => {
    fs.readFile("random.txt", "utf8", function(err, data) {
      var dataArr = data.split(",");
      if (dataArr.length === 2) {
        liriQuery(dataArr[0], dataArr[1]);
      } else if (dataArr.length === 1) {
        liriQuery(dataArr[0]);
      }
    });
};

// switch statement to determine user request method
const liriQuery = (caseCommand, functionArg) => {
    switch (caseCommand) {
        case 'concert-this':
            searchBandsInTown(functionArg);
            break;
        case 'spotify-this-song':
            searchSpotify(functionArg);
            break;
        case 'movie-this':
            searchOMDB(functionArg);
            break;    
        case 'do-what-it-says':
            obeyText();
            break;
        default:
            console.log("sorry friend, we've got an error");
    };
}

const runLiri = (arg1, arg2) => {
    liriQuery(arg1, arg2);
};

runLiri(process.argv[2], process.argv.slice(3).join(" "));