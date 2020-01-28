import React from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";

//import SCSS
import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { movie, onClick } = this.props;
    if (!movie) return null;

    return (
      <div className="movie-view">
        <Container>
          <Row>
            <Col sm={4}>
              <img className="movie-poster" src={movie.Imageurl} />
            </Col>
            <Col sm={8} className="movie-content">
              <div className="movie-title">
                <h2 className="value">{movie.Title}</h2>
              </div>
              <div className="movie-description">
                <p className="value">
                  <i>{movie.Description}</i>
                </p>
              </div>
              <div className="movie-genre">
                <span className="label">
                  <b>Genre: </b>
                </span>
                <span className="value">{movie.Genre.Name}</span>
              </div>
              <div className="movie-director">
                <span className="label">
                  <b>Director: </b>
                </span>
                <span className="value">{movie.Director.Name}</span>
              </div>
              <div className="back-button">
                <br />
                <Button
                  varient="primary"
                  onClick={() => onClick(null)}
                  className="go-back btn-danger"
                >
                  Go Back
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
