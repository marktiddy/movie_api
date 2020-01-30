import React from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";

//Import SCSS
import "./main-view.scss";

//Set up the router
import { BrowserRouter as Router, Route } from "react-router-dom";

//Import the movie card and login view
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { Navigation } from "../nav-bar/nav-bar";
import { GenreView } from "../genre-view/genre-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null
    };
  }
  logOutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (this.user) {
      this.setState({
        user: null
      });
    }
  }
  getMovies(token) {
    axios
      .get("http://mtiddy-myflix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({ movies: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }

  //New Method to handle loggedin
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    //Remember square brackets because we're in JSX
    const { movies, user } = this.state;

    //Before the movies have been loaded
    if (!movies) {
      return (
        <div className="main-view">
          <Navigation user={user} />
          No movies yet...
        </div>
      );
    }

    //New code below for the router
    return (
      <Router>
        <div className="main-view">
          <Navigation user={user} />
          <Container>
            <Row>
              <Route
                exact
                path="/"
                render={() => {
                  if (!user)
                    return (
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    );

                  return movies.map(m => (
                    <Col key={m._id}>
                      <MovieCard key={m._id} movie={m} />
                    </Col>
                  ));
                }}
              />

              <Route path="/register" render={() => <RegistrationView />} />
              <Route
                path="/logout"
                render={() => {
                  this.logOutUser();
                  window.open("/", "_self");
                }}
              />
              <Route
                path="/movies/:movieId"
                render={({ match }) => (
                  <MovieView
                    movie={movies.find(m => m._id === match.params.movieId)}
                  />
                )}
              />
              <Route
                path="/genres/:name"
                render={({ match }) => (
                  <GenreView
                    results={movies.map(
                      m => m.Genre.Name === match.params.name
                    )}
                    movies={movies}
                    genre={match.params.name}
                  />
                )}
              />

              <Route
                path="/directors/:name"
                render={({ match }) => (
                  <DirectorView
                    movie={movies.find(
                      m => m.Director.Name === match.params.name
                    )}
                  />
                )}
              />
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}
