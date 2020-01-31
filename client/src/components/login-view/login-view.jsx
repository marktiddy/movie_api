import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import ReactDOM from "react-dom";

//Import SCSS
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    //Check for validation
    const form = (event.currentTarget = event => {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
    });

    setValidated(true);

    event.preventDefault();
    //Make our API request
    axios
      .post("http://mtiddy-myflix.herokuapp.com/login", {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(error => {
        console.log("no such user");
        const errorMsg = (
          <div>
            <p>
              <br />
              Error: Username or Password are incorrect
            </p>
          </div>
        );
        ReactDOM.render(errorMsg, document.getElementById("error-report"));
      });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col className="bg-danger text-light intro-box">
            <h3>Welcome to MyFlix</h3>
            <p>Go ahead and log yourself in...</p>
            <h6>Don't have an account yet?</h6>
            <Button className="btn-light" href="/register">
              Register
            </Button>
          </Col>
          <Col>
            {" "}
            <Form noValidate validated={validated} id="login-form">
              <Form.Group controlId="basicLoginUsername">
                <Form.Label>Username: </Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please type a username
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="basicLoginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please type a password
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                varient="primary"
                className="btn-danger"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col id="error-report" className="text-danger"></Col>
        </Row>
      </Container>
    </div>
  );
}

LoginView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};
