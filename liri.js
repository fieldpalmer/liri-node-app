const dotenv = require('dotenv').config();
const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const axios = require('axios');
const fs = require('fs');
const moment = require('moment');
//instantiate spotify query object        
let spotify = new Spotify(keys.spotify);
//node liri.js concert-this <artist/band name>
const searchBandsInTown = (bandName) => {
    for ( var i = 3 ; i < process.argv.length ; i++) {
        if (i > 3 && i < process.argv.length) {
            bandName = bandName + ' ' + process.argv[i];
        }
        else {
            songName += process.argv[i];
        }
    }

    let queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function(err, response) {
            if (err) {
                console.log("Uh oh, nothing found! Error: " + err );
            }
            if (response.data.length > 0) {
                for( var i = 0 ; i < response.data[i].length ; i++) {
                    let name = response.data[i].venue.name;
                    let city = response.data[i].venue.city;
                    let country = response.data[i].venue.country;
                    let region = response.data[i].venue.region;
                    let time = response.data[i].venue.datetime;
                    let date = moment(time).format("dddd MMM Do, h:mm a");

                    console.log("Venue Info ************************");
                    console.log("Venue Name: " + name);
                    console.log("City: " + city);
                    console.log("Country: " + country);
                    console.log("Time: " + region);
                    console.log("Date: " + date);
                }
            }
        }
    )
};

// node liri.js spotify-this-song <song name>
const searchSpotify = (songName) => {
    //loop through process.argv to find query
    for (var i = 3; i < process.argv.length; i++) {
        if (i > 3 && i < process.argv.length) {
            songName = songName + ' ' + process.argv[i];
        }
        else {
            songName += process.argv[i];
        }
    }x
    spotify
        .search({
            type: 'track',
            query: songName,
            limit: 10
        }, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                if(data.tracks.items.length > 0) {
                    //loop through returned spotify data to display song info
                    for (var i = 0 ; i < data.tracks.items.length ; i++) {
                        let artist = data.tracks.items[i].artist[0].name;
                        let trackName = data.tracks.items[i].name;
                        let album = data.tracks.items[i].album.name;
                        let sample = data.tracks.items[i].preview_url;
                        console.log("Song #" + (i+1) + " ************************");
                        console.log("Song Name: " + trackName);
                        console.log("Artist: " + artist);
                        console.log("Album: " + album);
                        console.log("Preview Link: " + sample);
                    }
                } else {
                    console.log("sorry, no results found for that song");
                }
            }
        );
};

//node liri.js movie-this <movie name here>
const searchOMDB = (movieName) => {
    //for loop to add + to movie name
    for (var i = 3; i < process.argv.length; i++) {
        if (i > 3 && i < process.argv.length) {
            movieName = movieName + ' ' + process.argv[i];
        }
        else {
            movieName += process.argv[i];
        }
    }
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = 'http://www.omdbapi.com/?apikey=trilogy&t=' + movieName;

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
        });
};

//node liri.js do-what-it-says
const obeyText = () => {
    fs.readFile('random.txt', 'utf8', function(err, data){
        if(err) {
            console.log("Error occurred!\n" + err);
        }
        let songName = data.split(',')[1];
        searchSpotify(songName);
    })
}

// switch statement to determine user request method
let operator = process.argv[2];
switch (operator) {
    case 'concert-this':
        searchBandsInTown(bandName);
        break;
    case 'spotify-this-song':
        searchSpotify(songName);
        break;
    case 'movie-this':
        searchOMDB(movieName);
        break;    
    case 'do-what-it-says':
        obeyText();
        break;
    default:
        console.log("you've got an error dude");
};