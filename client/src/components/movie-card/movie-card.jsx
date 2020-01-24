import React from "react";

export class MovieCard extends React.Component {
  render() {
    //The next data is given to MovieCard by your MainView component
    const { movie, onClick } = this.props;

    //The code below uses the onclick and means that when a user clicks the component the onclick is called
    return (
      <div onClick={() => onClick(movie)} className="movie-card">
        {movie.Title}
      </div>
    );
  }
}
