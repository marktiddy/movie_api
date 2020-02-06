import React from "react";
import { connect } from "react-redux";

function TestComponent(props) {
  return (
    <div>
      Here is some content {props.visibilityFilter} <br />{" "}
      <h1>And a movie {movies[0].Title}</h1>{" "}
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
    visibilityFilter: state.visibilityFilter,
    movies: state.movies
  };
};

export default connect(mapStateToProps)(TestComponent);
