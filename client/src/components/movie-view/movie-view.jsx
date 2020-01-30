import React from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";

//import SCSS
import "./movie-view.scss";

//Import router
import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { movie } = this.props;
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
                <Container className="details-container">
                  <Row>
                    <Col>
                      <b>Genre: </b>
                    </Col>
                    <Col>
                      <Link to={`/genres/${movie.Genre.Name}`}>
                        <Button variant="outline-danger">
                          {movie.Genre.Name}
                        </Button>
                      </Link>
                    </Col>
                    <Col>
                      <b>Director: </b>
                    </Col>
                    <Col>
                      <Link to={`/directors/${movie.Director.Name}`}>
                        <Button variant="outline-danger">
                          {movie.Director.Name}
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Container>
              </div>

              <div className="back-button">
                <br />
                <Link to="/">
                  <Button varient="primary" className="go-back btn-danger">
                    Go Back
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
