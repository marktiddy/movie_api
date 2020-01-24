import React from "react";
import axios from "axios";

//Import the movie card
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      selectedMovie: null
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

  //Set up click function
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  render() {
    //Remember square brackets because we're in JSX
    const { movies, selectedMovie } = this.state;

    if (!movies) return <div className="main-view">No movies yet...</div>;

    //The code below shows optional chaining to see if there is a selected movie. If there isn't then it maps the movies and if there is it shows the details
    //when it maps all the movies and creates MovieCards it adds a click handler to call onMovieClick
    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onClick={movie => this.onMovieClick(null)}
          />
        ) : (
          movies.map(movie => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={movie => this.onMovieClick(movie)}
            />
          ))
        )}
      </div>
    );
  }
}

//http://mtiddy-myflix.herokuapp.com/movies
