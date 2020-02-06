import React from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";

//Import react redux stuff
import { connect } from "react-redux";
//Import our action
import { setMovies, setUser } from "../../actions/actions";

//Import SCSS
import "./main-view.scss";

//Set up the router
import { BrowserRouter as Router, Route } from "react-router-dom";

//Import the movie card and login view
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { Navigation } from "../nav-bar/nav-bar";
import { GenreView } from "../genre-view/genre-view";
import { UserView } from "../user-view/user-view";
import MoviesList from "../movies-list/movies-list";

class MainView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem("user"));

      this.getMovies(accessToken);
    }
  }

  logOutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.props.setUser("");
  }

  getMovies(token) {
    axios
      .get("https://mtiddy-myflix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  //New Method to handle loggedin
  onLoggedIn(authData) {
    this.props.setUser(authData.user.Username);

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
    console.log(localStorage.getItem("token"));
  }

  render() {
    //Get our movies from our props
    let { movies } = this.props;
    //Get user from the props
    let { user } = this.props;

    //New code below for the router
    return (
      <Router>
        <div className="main-view">
          <Navigation user={user} />
          <Container>
            <Route
              exact
              path="/"
              render={() => {
                if (user === "") {
                  return (
                    <Row>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Row>
                  );
                }

                return <MoviesList movies={movies} />;
              }}
            />
            <Route
              path="/register"
              render={() => (
                <Row>
                  <RegistrationView />
                </Row>
              )}
            />
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
                <Row>
                  <MovieView
                    movie={movies.find(m => m._id === match.params.movieId)}
                  />
                </Row>
              )}
            />
            <Route
              path="/genres/:name"
              render={({ match }) => (
                <Row>
                  <GenreView
                    results={movies.filter(
                      m => m.Genre.Name === match.params.name
                    )}
                    movies={movies}
                    genre={match.params.name}
                  />
                </Row>
              )}
            />

            <Route
              path="/directors/:name"
              render={({ match }) => (
                <Row>
                  <DirectorView
                    movie={movies.find(
                      m => m.Director.Name === match.params.name
                    )}
                  />
                </Row>
              )}
            />
            <Route
              path="/profile/:user"
              render={({ match }) => (
                <Row>
                  <UserView user={match.params.user} />
                </Row>
              )}
            />
          </Container>
        </div>
      </Router>
    );
  }
}

//Make sure we subscribe to the store for updates to movies
//We say that the movies property of this component is the movies from our state (store)
let mapStateToProps = state => {
  return { movies: state.movies, user: state.user };
};
//This is what extracts the movies from the state and we pass it as the movies prop in main view
export default connect(mapStateToProps, { setMovies, setUser })(MainView);
