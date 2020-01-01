const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  app = express(),
  morgan = require("morgan");

//Create a JSON object
let Movies = [
  {
    title: "The Muppets Christmas Carol",
    description:
      "The Muppet characters tell their version of the classic tale of an old and bitter miser's redemption on Christmas Eve",
    director: "Brian Henson",
    genre: "Family",
    imageURL:
      "https://m.media-amazon.com/images/M/MV5BN2Y0NWRkNWItZWEwNi00MDNlLWJmZDYtNTkwYzI5Nzg4MjVjXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
    featured: true
  },
  {
    title: "Love Actually",
    description:
      "Follows the lives of eight very different couples in dealing with their love lives in various loosely interrelated tales all set during a frantic month before Christmas in London, England.",
    director: "Richard Curtis",
    genre: "Romance",
    imageURL:
      "https://m.media-amazon.com/images/M/MV5BMTY4NjQ5NDc0Nl5BMl5BanBnXkFtZTYwNjk5NDM3._V1_UX182_CR0,0,182,268_AL_.jpg",
    featured: true
  },
  {
    title: "It's a Wonderful Life",
    description:
      "An angel is sent from Heaven to help a desperately frustrated businessman by showing him what life would have been like if he had never existed.",
    director: "Frank Capra",
    genre: "Family",
    imageURL:
      "https://m.media-amazon.com/images/M/MV5BZjc4NDZhZWMtNGEzYS00ZWU2LThlM2ItNTA0YzQ0OTExMTE2XkEyXkFqcGdeQXVyNjUwMzI2NzU@._V1_UY268_CR1,0,182,268_AL_.jpg",
    featured: false
  },
  {
    title: "The Holiday",
    description:
      "Two women troubled with guy-problems swap homes in each other's countries, where they each meet a local guy and fall in love.",
    director: "Nancy Meyers",
    genre: "Romance",
    imageURL:
      "https://m.media-amazon.com/images/M/MV5BMTI1MDk4MzA2OF5BMl5BanBnXkFtZTYwMjQ3NDc3._V1_UX182_CR0,0,182,268_AL_.jpg",
    featured: false
  },
  {
    title: "Elf",
    description:
      "After discovering he is a human, a man raised as an elf at the North Pole decides to travel to New York City to locate his real father.",
    director: "Jon Favreau",
    genre: "Family",
    imageURL:
      "https://m.media-amazon.com/images/M/MV5BMzUxNzkzMzQtYjIxZC00NzU0LThkYTQtZjNhNTljMTA1MDA1L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
    featured: false
  },
  {
    title: "The Santa Clause",
    description:
      "When a man inadvertently makes Santa fall off of his roof on Christmas Eve, he finds himself magically recruited to take his place.",
    director: "John Pasquin",
    genre: "Family",
    imageURL:
      "https://m.media-amazon.com/images/M/MV5BMTZlNzk1MjItYjJlYy00MTAxLWJkNjEtZmNiNmVlNjQ4NDE5XkEyXkFqcGdeQXVyMzI0NDc4ODY@._V1_UX182_CR0,0,182,268_AL_.jpg",
    featured: true
  },
  {
    title: "The Santa Clause 2",
    description:
      "Scott Calvin has been a humble Santa Claus for nearly ten years, but it might come to an end if he doesn't find a Mrs. Claus.",
    director: "Michael Lembeck",
    genre: "Family",
    imageURL:
      "https://m.media-amazon.com/images/M/MV5BNjU0Njk5MTA2Nl5BMl5BanBnXkFtZTYwODkzMzQ3._V1_UX182_CR0,0,182,268_AL_.jpg",
    featured: false
  },

  {
    title: "Last Christmas",
    description:
      "Kate is a young woman subscribed to bad decisions. Working as an elf in a year round Christmas store is not good for the wannabe singer. However, she meets Tom there. Her life takes a new turn. For Kate, it seems too good to be true.",
    director: "Paul Feig",
    genre: "Romance",
    imageURL:
      "https://m.media-amazon.com/images/M/MV5BNTQ4ZmY0NjgtYzVhNy00NzhiLTk3YTYtNzM1MTdjM2VhZDA3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
    featured: true
  },
  {
    title: "Home Alone",
    description:
      "An eight-year-old troublemaker must protect his house from a pair of burglars when he is accidentally left home alone by his family during Christmas vacation.",
    director: "Chris Columbus",
    genre: "Family",
    imageURL:
      "https://m.media-amazon.com/images/M/MV5BMzFkM2YwOTQtYzk2Mi00N2VlLWE3NTItN2YwNDg1YmY0ZDNmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
    featured: false
  },
  {
    title: "Die Hard",
    description:
      "An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.",
    director: "John McTiernan",
    genre: "Action",
    imageURL:
      "https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    featured: true
  }
];

let Users = [
  {
    username: "tarkmiddy",
    password: "1287998",
    userId: "001",
    dob: "18/10/86",
    email: "hello@marktiddy.co.uk",
    favourites: {
      001: "Love Actually",
      002: "The Holiday"
    }
  }
];

//Get routing
//Set up static
app.use(express.static("public"));

//Set up bodyParser
app.use(bodyParser.json());

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
app.get("/movies", (req, res) => {
  res.json(Movies);
});

//Return details on a specific movie
app.get("/movies/:title", (req, res) => {
  res.json(
    Movies.find(movie => {
      return movie.title === req.params.title;
    })
  );
});

//Return movie by director
app.get("/movies/director/:name", (req, res) => {
  res.json(
    Movies.find(movie => {
      console.log(Movies.director);
      return movie.director === req.params.name;
    })
  );
});

//Return movie by genre
app.get("/movies/genre/:genre", (req, res) => {
  var moviesByGenre = [];

  for (var i = 0; i < Movies.length; i++) {
    console.log(i);
    if (Movies[i].genre === req.params.genre) {
      moviesByGenre.push(Movies[i]);
    }
  }

  if (moviesByGenre.length != 0) {
    return res.json(moviesByGenre);
  } else {
    res
      .status(404)
      .send(`We have no movies matching the genre: ${req.params.genre}`);
  }
});

//User Registration API Request Handling
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    res.status(400).send("There is no username ");
  } else {
    newUser.userId = uuid.v4();
    newUser.favourites = {};
    Users.push(newUser);
    res.status(201).send(newStudent);
  }
});

//Update a user info
app.put("/users/:username", (req, res) => {
  let infoToUpdate = req.body;
  let user = Users.find(username => {
    return Users.username === req.params.username;
  });

  if (user) {
    //Assuming our JSON might have a few things to update...
    for (var i = 0; i < infoToUpdate.length; i++) {
      user.infoToUpdate[i] == infoToUpdate[i];
    }
    //Update the list
    Users.userId[user.userId] == user;
    res
      .status(201)
      .send(`We have updated your user account. Your new info is ${user}`);
  } else {
    res
      .status(404)
      .send(
        `We cannot find a user matching the username ${req.params.username}`
      );
  }
});

//Allow user to add to list of favourites
app.put("/users/:username/:movieTitle", (req, res) => {
  let user = Users.find(username => {
    return Users.username === req.params.username;
  });

  if (user) {
    user.favourites.uuid.v4() = req.params.movieTitle;
    Users.userId[user.userId] == user;
    res
      .status(201)
      .send(
        `Successfully added ${req.params.movieTitle} to your favourites. Your favourite movies are ${user.favourites}`
      );
  } else {
    res
      .status(404)
      .send(
        `We cannot find a user matching the username ${req.params.username}`
      );
  }
});

//Allow user to remove a movie from their favourites
app.delete("/users/:username/:movieTitle", (req, res) => {
  let user = Users.find(username => {
    return Users.username === req.params.username;
  });

  if (user) {
    //Check if the request movie is in their favourites
    for (var i = 0; i < user.favourites.length; i++) {
      if (user.favourites[i].hasOwnProperty(req.params.movieTitle)) {
        delete user.favourites[i];
        res
          .status(201)
          .send(
            `${req.params.movieTitle} has been removed from your favourites`
          );
      } else {
        res
          .status(404)
          .send(`The movie ${req.params.movieTitle} isn't in your favourites`);
      }
    }
  } else {
    res
      .status(404)
      .send(
        `We cannot find a user matching the username ${req.params.username}`
      );
  }
});

//Deregister A User
app.delete("/users/:username", (req, res) => {
  let user = Users.find(username => {
    return Users.username === req.params.username;
  });

  if (user) {
    //delete the user
    for (var i = 0; i < Users.length; i++) {
      if (Users[i].username === req.params.username) {
        delete Users[i];
        res
          .status(201)
          .send(`Username ${req.params.username} has been deleted`);
      }
    }
  } else {
    res
      .status(404)
      .send(
        `We cannot find a user matching the username ${req.params.username}`
      );
  }
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
