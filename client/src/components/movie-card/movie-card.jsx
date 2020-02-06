import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

//Import SCSS
import "./movie-card.scss";

//Import the link method from react router
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    //The next data is given to MovieCard by your MainView component
    const { movie } = this.props;

    //The code below uses the onclick and means that when a user clicks the component the onclick is called
    return (
      <Card style={{ width: "13rem" }} key={movie._id}>
        <Link to={`/movies/${movie._id}`}>
          {" "}
          <Card.Img variant="top" src={movie.Imageurl} />
        </Link>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="primary" className="btn-danger">
              More Details
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

//Validate our props
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Imageurl: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Bio: PropTypes.string
    })
  }).isRequired
};
