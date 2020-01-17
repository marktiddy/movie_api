const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  app = express(),
  morgan = require("morgan"),
  mongoose = require("mongoose"),
  Models = require("./models.js"),
  cors = require("cors");

const { check, validationResult } = require("express-validator");

//Set up cors for limited API access
//var allowedOrigins = ["http://localhost:8080"];

// app.use(
//   cors({
//     origin: function(origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         //The domain isn't allowed
//         var message = `The CORS policy for this application doesn't allow access from origin ${origin}`;
//         return callback(new Error(message), false);
//       }
//       return callback(null, true);
//     }
//   })
// );

//Sort out mongoose depreciation
mongoose.set("useFindAndModify", false);

//Constants for Models
const Movies = Models.Movie;
const Users = Models.User;

//mongoose.connect("mongodb://localhost:27017/myFlixDB");
mongoose.connect(
  "mongodb+srv://myFlixDBadmin:EM1ayokPBHgTrhBV@cluster0-lxob6.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

//Get routing
//Set up static
app.use(express.static("public"));

//Set up bodyParser
app.use(bodyParser.json());

var auth = require("./auth")(app);

//Add our authentication
const passport = require("passport");
require("./passport");

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
app.get(
  "/movies/:title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

//Return movie by director
app.get(
  "/movies/director/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

//Return movie by genre
app.get(
  "/movies/genre/:genre",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find({ "Genre.Name": req.params.genre })
      .then(movies => {
        if (!movies) {
          res
            .status(400)
            .send(
              `We didn't find any movies with the genre ${req.params.genre}`
            );
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

//User Registration API Request Handling

/*Note: We'll expect a JSON in this format
{
  ID: Integer,
    Username: String,
    Password: String,
    Email: String,
    Birthday:Date

}
*/
app.post(
  "/users",
  //Let's validate the input
  [
    check("Username", "Username is required").isLength(
      { min: 5 },
      check(
        "Username",
        "Username contains non alphanumeric characters - not allowed"
      ).isAlphanumeric(),
      check("Password", "Password is required")
        .not()
        .isEmail(),
      check("Email", "Email does not appear to be valid").isEmail()
    )
  ],

  (req, res) => {
    //Get validation results
    var errors = validationResult(req);

    //Check we don't have validation issues
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //Hash the password
    var hashedPassword = Users.hashedPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then(user => {
        if (user) {
          return res.status(400).send(req.body.Username + "Already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
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
  }
);

//Update a user info

/*
We'll expect a JSON in this format
{
Username: String, (required)
Password: String, (required)
Email: String, (required)
Birthday: Date
} */
app.put(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),

  //Validate the input
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "USername",
      "Username contains non alphanumeric characters - not allowed"
    ).isAlphanumeric(),
    check("Password", "Password is required")
      .not()
      .isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail()
  ],

  (req, res) => {
    //Check input is valid
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

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
  }
);

//Get user by username - Mongoose
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then(function(user) {
        res.status(201).json(user);
      })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

//Allow user to add to list of favourites
app.put(
  "/users/:username/:movieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

//Allow user to remove a movie from their favourites
app.delete(
  "/users/:username/:movieTitle",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.movieTitle })
      .then(movie => {
        if (!movie) {
          res
            .status(500)
            .send(`We didn't find ${movieTitle} in your favourites`);
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
  }
);

//Delete A User by Username
app.delete(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

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

app.get("/allusers", (req, res) => {
  Users.find()
    .then(users => {
      if (!users) {
        res.status(400).send("There are no users");
      } else {
        res.status(201).send(`Here are some users ${users}`);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(400).send(`Error: ${error}`);
    });
});

//Listen for requests
//Old local code
//app.listen(8080, () => console.log("server is up and running"));

//Heroku Code
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 3000");
});
