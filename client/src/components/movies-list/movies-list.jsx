import React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

//Import visibility filter component
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";

export function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;
  console.log(visibilityFilter);

  if (visibilityFilter !== undefined) {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view" />;

  return (
    <div className="movies-list">
      <Row>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Row>
      <Row>
        {filteredMovies.map(m => (
          <Col key={m._id}>
            <MovieCard key={m._id} movie={m} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

//Lets say we want to subscribe to updates to movies and access the visibility filter action
const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

export default connect(mapStateToProps)(MoviesList);
