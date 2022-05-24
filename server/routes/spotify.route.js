const SpotifyController = require('../controllers/spotify.controllers');

module.exports = app => {
  app.get("/songs/:query", SpotifyController.getSongsByKeyword);
  app.get("/song/songId", SpotifyController.getSongById);
}