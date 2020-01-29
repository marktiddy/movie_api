import React from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

//Import SCSS
import "./main-view.scss";

//Import the movie card and login view
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Navigation } from "../nav-bar/nav-bar";
import { MovieModal } from "../movie-modal/movie-modal";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios
      .get("http://mtiddy-myflix.herokuapp.com/movies")
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
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

  //Set up click function
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  render() {
    //Remember square brackets because we're in JSX
    const { movies, selectedMovie, user } = this.state;

    //If a user isn't logged in call the login view and pass the onLoggedIn method to it
    if (!user) {
      return (
        <div className="main-view">
          <Navigation />
          <Container>
            <Row></Row>
            <Row>
              <Col>
                <h2>Log In</h2>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              <Col>
                <h2>Register a New User</h2>
                <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    }

    //Before the movies have been loaded
    if (!movies) {
      return (
        <div className="main-view">
          <Navigation />
          No movies yet...
        </div>
      );
    }

    //The code below shows optional chaining to see if there is a selected movie. If there isn't then it maps the movies and if there is it shows the details
    //when it maps all the movies and creates MovieCards it adds a click handler to call onMovieClick
    return (
      <div className="main-view">
        <Navigation />
        <Container>
          <Row>
            {selectedMovie ? (
              <MovieView
                movie={selectedMovie}
                onClick={movie => this.onMovieClick(null)}
              />
            ) : (
              movies.map(movie => (
                <Col key={movie._id}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onClick={movie => this.onMovieClick(movie)}
                  />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>
    );
  }
}
