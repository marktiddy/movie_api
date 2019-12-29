const express = require("express");
const app = express();
const morgan = require("morgan");

//Create a JSON object
let topMovies = [
  {
    title: "The Muppets Christmas Carol",
    starring: "Kermit the Frog"
  },
  {
    title: "Love Actually",
    starring: "Hugh Grant"
  },
  {
    title: "It's a Wonderful Life",
    starring: "James Steward"
  },
  {
    title: "The Holiday",
    starring: "Cameron Diaz"
  },
  {
    title: "Elf",
    starring: "Will Ferrell"
  },
  {
    title: "The Santa Clause",
    starring: "Tim Allen"
  },
  {
    title: "The Santa Clause 2",
    starring: "Tim Allen"
  },
  {
    title: "The Santa Clause 3",
    starring: "Tim Allen"
  },
  {
    title: "Last Christmas",
    starring: "Emilia Clarke"
  },
  {
    title: "Home Alone",
    starring: "Macaulay Culkin"
  }
];

//Get routing
//Set up static
app.use(express.static("public"));

//Set up logging with morgan
app.use(morgan("common"));

//Finally set up error handling
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("something went wrong...oops");
});

//Handle requests
app.get("/", function(req, res) {
  res.send("Welcome to the Movie Database");
});

app.get("/movies", function(req, res) {
  res.json(topMovies);
});

app.get("/documentation", function(req, res) {
  res.sendFile("documentation.html", { root: __dirname });
});

app.get("/documentation.html", function(req, res) {
  res.sendFile("documentation.html", { root: __dirname });
});

//Listen for requests
app.listen(8080, () => console.log("server is up and running"));
