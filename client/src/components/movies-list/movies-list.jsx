import { Container, Row, Col, Button } from "react-bootstrap";
import React from "react";
import { connect } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";

//Import visibility filter component
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

//This function takes an input of state and returns the visibility filter as the state.
//This means the props for MoviesList contains the visibilityFilter action and the movies which was
//passed when the MainView component rendered this component. This means you can filter
//The movies array based on the value present in visibilityFilter
const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

export function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== undefined) {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view" />;
  console.log(visibilityFilter);
  return filteredMovies.map(m => (
    <div className="movies-list">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      {filteredMovies.map(m => (
        <Col key={m._id}>
          <MovieCard key={m._id} movie={m} />
        </Col>
      ))}
    </div>
  ));
}

//Lets say we want to subscribe to updates to movies and access the visibility filter action
export default connect(mapStateToProps)(MoviesList);
