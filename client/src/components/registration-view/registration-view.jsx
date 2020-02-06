import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";

//Import SCSS
import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState(""),
    [password, setPassword] = useState(""),
    [email, setEmail] = useState(""),
    [birthday, setBirthday] = useState("");

  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();

    //Make the request using axios
    axios
      .post("http://mtiddy-myflix.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self"); //self means it will open in the current tab
      })
      .catch(error => {
        console.log("error registering the user");
      });

    props.onLoggedIn(username);
  };

  return (
    <Container>
      <Row>
        <Col className="bg-danger text-light intro-box">
          <h3>Welcome to MyFlix</h3>
          <p>
            To register for a new account just fill in your details using the
            form
          </p>
        </Col>
        <Col>
          <Form noValidate validated={validated} id="registration-form">
            <Form.Group controlId="registerUsername">
              <Form.Label>Choose a Username</Form.Label>
              <Form.Control
                required
                type="username"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please choose a username
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="registerEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter an email address
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="registerPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Choose a password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please choose a password
              </Form.Control.Feedback>

              <Form.Text className="text-muted">Enter a new password</Form.Text>
            </Form.Group>
            <Form.Group controlId="registerBirthday">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                required
                placeholder="Enter your birthday"
                type="date"
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
              />
              <Form.Text className="text-muted">Format: YYYY-MM-DD</Form.Text>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter a valid date
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
    </Container>
  );
}

RegistrationView.propType = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.instanceOf(Date).isRequired
};
