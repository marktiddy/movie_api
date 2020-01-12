const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  app = express(),
  morgan = require("morgan"),
  mongoose = require("mongoose"),
  Models = require("./models.js");
//Add our authentication
const passport = require("passport");
require("./passport");

//Constants for Models
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/myFlixDB");

//Get routing
//Set up static
app.use(express.static("public"));

//Set up bodyParser
app.use(bodyParser.json());

var auth = require("./auth")(app);
router.use(bodyParser.json());

//Set up logging with morgan
app.use(morgan("common"));

//Finally set up error handling
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("something went wrong...oops");
});

//Set up our API request routing for movies
app.get("/", (req, res) => {
  res.send("Welcome to the Christmas Movie Database. Ho Ho Ho!");
});

//Returns all movies
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find()
      .then(movies => {
        if (!movies) {
          res.status(400).send("There are no movies");
        } else {
          res.status(201).json(movies);
        }
      })
      .catch(error => {
        console.error(error);
        res.status(400).send(`Error: ${error}`);
      });
  }
);

//Return details on a specific movie
app.get("/movies/:title", (req, res) => {
  Movies.findOne({ Title: req.params.title })
    .then(movie => {
      if (!movie) {
        res
          .status(400)
          .send(`We didn't find a movie title ${req.params.title}`);
      } else {
        res.status(201).json(movie);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(400).send(`Error: ${error}`);
    });
});

//Return movie by director
app.get("/movies/director/:name", (req, res) => {
  Movies.find({ "Director.Name": req.params.name })
    .then(movies => {
      if (!movies) {
        res
          .status(400)
          .send(
            `We didn't find any movies where ${req.params.name} was the director`
          );
      } else {
        res.status(201).json(movies);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(400).send(`Error: ${error}`);
    });
});

//Return movie by genre
app.get("/movies/genre/:genre", (req, res) => {
  Movies.find({ "Genre.Name": req.params.genre })
    .then(movies => {
      if (!movies) {
        res
          .status(400)
          .send(`We didn't find any movies with the genre ${req.params.genre}`);
      } else {
        res.status(201).json(movies);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(400).send(`Error: ${error}`);
    });
});

//User Registration API Request Handling - UPDATED with mongoose

/*Note: We'll expect a JSON in this format
{
  ID: Integer,
    Username: String,
    Password: String,
    Email: String,
    Birthday:Date

}
*/
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then(user => {
      if (user) {
        return res.status(400).send(req.body.Username + "Already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(user => {
            res.status(201).json(user);
          })
          .catch(error => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//Update a user info
//AT SOME POINT REFACTURE THIS TO A CATCH BLOCK
/*
We'll expect a JSON in this format
{
Username: String, (required)
Password: String, (required)
Email: String, (required)
Birthday: Date
} */
app.put("/users/:username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }
  )
    .then(function(error, updatedUser) {
      if (error) {
        console.error(error);
        res.status(500).send(`Error: ${error}`);
      } else {
        res.json(updatedUser);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send(`Error: ${error}`);
    });
});

//Get all users
app.get("/allusers", (req, res) => {
  Users.find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send(`Error: ${error}`);
    });
});

//Get user by username - Mongoose
app.get("/users/:Username", (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then(function(user) {
      res.status(201).json(user);
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//Allow user to add to list of favourites
app.put("/users/:username/:movieID", (req, res) => {
  //with catch block
  Users.findOneAndUpdate(
    { Username: req.params.username },
    { $push: { Favourites: req.params.movieID } },
    { new: true }
  )
    .then(function(user) {
      if (!user) {
        res
          .status(400)
          .send(`We could find a user matching ${req.params.username}`);
      } else {
        res.status(200).send(user);
      }
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).send(`Error: ${error}`);
    });
});

//Allow user to remove a movie from their favourites
app.delete("/users/:username/:movieTitle", (req, res) => {
  Movies.findOne({ Title: req.params.movieTitle })
    .then(movie => {
      if (!movie) {
        res.status(500).send(`We didn't find ${movieTitle} in your favourites`);
      } else {
        //Let's delete something
        //do the actual deleting
        Users.findOneAndUpdate(
          { Username: req.params.username },
          { $pull: { Favourites: `${movie._id}` } },
          { new: true }
        )
          .then(results => {
            if (!results) {
              res.status(400).send(`We had a problem removing the item`);
            } else {
              res
                .status(201)
                .send(
                  `We removed ${movie.Title} from your favourites. Your favourites are now ${results.Favourites}`
                );
            }
          })
          .catch(error => {
            console.error(error);
            res.status(400).send(`Error: ${error}`);
          });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(400).send(`Error: ${error}`);
    });
});

//Delete A User by Username - Updated for mongoose
app.delete("/users/:username", (req, res) => {
  Users.findOneAndDelete({ Username: req.params.username })
    .then(function(user) {
      if (!user) {
        res.status(400).send(`${req.params.username} was not found`);
      } else {
        res.status(200).send(`${req.params.username} was deleted`);
      }
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).send(`Error: ${error}`);
    });
});

//Other Request Handling
//Return documentation
app.get("/documentation.html", (req, res) => {
  res.sendFile("documentation.html", { root: __dirname });
});

//Teapot Joke
app.get("/teapot", (req, res) => {
  res
    .status(418)
    .statusMessage(
      "I'm a little teapot, short and stout. Here's my handle, here's my spout"
    );
});

//Listen for requests
app.listen(8080, () => console.log("server is up and running"));
