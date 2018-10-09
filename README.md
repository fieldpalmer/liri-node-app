# liri-node-app

Use the command line to display info on the following: 
- Songs 
- Concerts
- Movies

### Set up
If you don't already have node installed, you'll need to do that. Once you've got node, download the repository and install dependencies.

Install node module dependencies 
```
npm i 
```
You will need your own [Spotify API Key](https://developer.spotify.com/) to run the program.

Add your API access info to a new file called `.env`

```
# API Keys
SPOTIFY_ID=your_spotify_id
SPOTIFY_SECRET=your_spotify_secret
```

#### Search Spotify

```
node liri.js spotify-this-song song name
```

#### Search Bands in Town
```
node liri.js concert-this band/artist name
```

#### Search Movies 
```
node liri.js movie-this movie name
```

#### Obey Text File
```
node liri.js do-what-it-says
```