const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Playlist name is required"],
      minLength: [2, "Playlist name must be at least 2 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [5, "Description must be at least 5 characters"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: [
        "Rock",
        "Jazz",
        "EDM",
        "Dubstep",
        "Techno",
        "R&B",
        "Country",
        "Pop",
        "Indie Rock",
        "Electro",
        "Classical",
        "Latin",
        "Hip Hop",
      ],
    },
    songs: [],
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", PlaylistSchema);
