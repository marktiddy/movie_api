import React from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";

//Import router
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { movie } = this.props;
    if (!movie) return null;

    return (
      <div className="director-view">
        <Container>
          <Row>
            <Col>
              <div className="director-name">
                <h2>{movie.Director.Name}</h2>
              </div>
              <div className="director-details">
                <p className="bio">
                  {movie.Director.bio
                    ? "We don't have a bio for this director"
                    : movie.Director.Bio}
                </p>
                <p className="born-died">
                  Born: {movie.Director.Birth}
                  <br />
                  {movie.Director.Death ? `Died: ${movie.Director.Death}` : ""}
                </p>
              </div>

              <div className="back-button">
                <br />
                <Link to="/">
                  <Button varient="primary" className="go-back btn-danger">
                    Close
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
