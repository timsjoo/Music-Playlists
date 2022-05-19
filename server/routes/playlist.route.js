const PlaylistController = require('../controllers/playlist.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get("/api/playlists", PlaylistController.getAllPlaylists);
    app.get("/api/playlists/:id", PlaylistController.getOnePlaylist);
    app.get("/api/users/playlists/:id", PlaylistController.getAllPlaylistsByUserId)
    app.post("/api/playlists", authenticate, PlaylistController.createPlaylist);
    app.put("/api/playlists/:id", PlaylistController.updatePlaylist);
    app.delete("/api/playlists/:id", PlaylistController.deletePlaylist);
}