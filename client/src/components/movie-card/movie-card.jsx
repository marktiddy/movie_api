import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

//Import SCSS
import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    //The next data is given to MovieCard by your MainView component
    const { movie, onClick } = this.props;

    //The code below uses the onclick and means that when a user clicks the component the onclick is called
    return (
      <Card style={{ width: "13rem" }} key={movie._id}>
        <Card.Img variant="top" src={movie.Imageurl} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button
            onClick={() => onClick(movie)}
            variant="primary"
            className="btn-danger"
          >
            More Details
          </Button>
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
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
