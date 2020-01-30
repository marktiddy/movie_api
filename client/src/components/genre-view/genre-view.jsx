import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";

import "./genre-view.scss";

export function GenreView(props) {
  console.log(props);
  var objectToReturn = [];
  objectToReturn.push(
    <Container>
      <Row className="genre-row">
        <Col>
          <h3>{props.genre} Movies</h3>
        </Col>
        <Col sm={2}>
          <Link to="/">
            <Button varient="primary" className="go-back btn-danger">
              Home
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
  for (var i = 0; i < props.results.length; i++) {
    if (props.results[i]) {
      objectToReturn.push(
        <Col key={props.movies[i]._id}>
          <MovieCard key={props.movies[i]._id} movie={props.movies[i]} />
        </Col>
      );
    }
  }
  console.log(objectToReturn);
  return objectToReturn;
}
