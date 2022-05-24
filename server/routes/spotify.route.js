const SpotifyController = require('../controllers/spotify.controller');

module.exports = app => {
  app.get("/songs/:query", SpotifyController.getSongsByKeyword);
  app.get("/song/songId", SpotifyController.getSongById);
}