const mongoose = require("mongoose");

var movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: String,
    Death: String
  },
  Actors: [String],
  Imageurl: String,
  Featured: Boolean
});

var userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
  Favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  Birthday: Date
});

var Movie = mongoose.model("Movie", movieSchema);
var User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
