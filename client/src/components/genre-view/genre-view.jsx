import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";

import "./genre-view.scss";

export function GenreView(props) {
  return (
    <Container>
      <Row className="genre-row">
        <Col>
          <h3>{props.genre} Movies</h3>
        </Col>
      </Row>
      <Row>
        {props.results.map(m => (
          <Col key={m._id}>
            <MovieCard key={m._id} movie={m} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
