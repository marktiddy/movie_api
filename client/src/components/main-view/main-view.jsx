import React from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";

//Import react redux stuff
import { connect } from "react-redux";
//Import our action
import { setMovies } from "../../actions/actions";

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
import { UserView } from "../user-view/user-view";
import { MoviesList } from "../movies-list/movies-list";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
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
        this.props.setMovies(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  //New Method to handle loggedin
  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
    console.log(localStorage.getItem("token"));
  }

  render() {
    //Get our movies from our props
    let { movies } = this.props;
    //Get user from the state
    let { user } = this.state;

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
                  return <MoviesList movies={movies} />;
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
                    results={movies.filter(
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
              <Route
                path="/profile/:user"
                render={({ match }) => <UserView user={match.params.user} />}
              />
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}

//Make sure we subscribe to the store for updates to movies
//We say that the movies property of this component is the movies from our state (store)
let mapStateToProps = state => {
  return { movies: state.movies };
};
//This is what extracts the movies from the state and we pass it as the movies prop in main view
export default connect(mapStateToProps, { setMovies })(MainView);
