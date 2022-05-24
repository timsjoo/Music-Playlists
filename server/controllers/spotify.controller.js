const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  redirectUri: 'http://localhost:3000',
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
})

const accessToken = spotifyApi.access_token

module.exports = {

  getSongsByKeyword: async (req, res) => {
    (await spotifyApi.clientCredentialsGrant(accessToken)
    .then((data) => {
      spotifyApi.setAccessToken(data.body.access_token);
      return spotifyApi.searchTracks(req.params.query);
    })
    .then((data) => {
      res.json(data.body.tracks)
    })
    .catch(err => console.log(err))
    )
  },

  getSongById: async (req, res) => {
    (await spotifyApi.clientCredentialsGrant(code)
      .then((data) => {
        spotifyApi.setAccessToken(data.body.access_token);
        return spotifyApi.getTrack(req.params.songId);
      })
      .then((data)=> {
        res.json(data.body)
      })
      .catch(err => console.log(err))
    )
  }
}