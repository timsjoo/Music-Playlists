const Playlist = require('../models/playlist');
const jwt = require('jsonwebtoken');

module.exports = {

  getAllPlaylists: (req, res) => {
    Playlist.find()
      .populate("createdBy", "username email")
      .then((allPlaylists) => {
        console.log("getAllPlaylists", {allPlaylists}); // for debugging if we need later on
        res.json(allPlaylists);
      })
      .catch((err) => {
        res.json({
          message: "Something went wrong: getAllPlaylists",
          error: err
        });
      });
  },

  getOnePlaylist: (req, res) => {
    Playlist.findOne({_id: req.params.id}) 
      .then((onePlaylist) => {
        console.log("getOnePlaylist", {onePlaylist}); // for debugging if we need later on
        res.json(onePlaylist);
      })
      .catch((err) => {
        res.json({
          message: "Something went wrong: getOnePlaylist",
          error: err
        })
      })
  },

  // Will finish once I have models
  // getAllPlaylistsByUserId: (req, res) => {
  //   Playlist.find({userId: req.params.userId}) // Probably will have to change this depending on what we name the attribute for the model
  // }

  createPlaylist: (req, res) => {
    const newPlaylistObject = new Playlist(req.body);
    const decodedJWT = jwt.decode(req.cookies.usertoken, {
      complete: true,
    });
    newPlaylistObject.createdBy = decodedJWT.payload.id;

    newPlaylistObject
      .save()
      .then((newPlaylist) => {
        newPlaylist
          .populate("createdBy", "username email" )
          .then((newPlaylist) => {
            console.log("createPlaylist", {newPlaylist, createdBy}); // debugging
            res.json(newPlaylist)
          })
      })
      .catch((err) => {
        console.log("Something went wrong, createPlaylist");
        res.status(400).json(err)
      })
  },

  updatePlaylist: (req, res) => {
    Playlist.findOneAndUpdate({_id: req.paramd.id}, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedPlaylist) => res.json(updatedPlaylist))
      .catch((err) => {
        console.log("Something went wrong: updatePlaylist");
        res.status(400).json(err);
      });
  },

  deletePlaylist: (req, res) => {
    Playlist.deleteOne({ _id: req.params.id })
      .then((deletedPlaylist) => {
        res.json(deletedPlaylist);
      })
      .catch((err) =>
        res.json({ message: "Something went wrong: deletePlaylist", error: err })
      );
  },
}