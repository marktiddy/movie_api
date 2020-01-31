import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";

export function UserView(props) {
  const [username, setUsername] = useState(props.user),
    [password, setPassword] = useState(""),
    [email, setEmail] = useState(""),
    [birthday, setBirthday] = useState("");

  const [validated, setValidated] = useState(false);

  const deleteAccount = event => {
    let token = localStorage.getItem("token");

    axios
      .delete(`http://mtiddy-myflix.herokuapp.com/users/${props.user}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log(response);
        window.open("/logout", "_self");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUpdate = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    let token = localStorage.getItem("token");

    event.preventDefault();

    //Make the request using axios
    var postData = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    let axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios
      .put(
        `http://mtiddy-myflix.herokuapp.com/users/${props.user}`,
        postData,
        axiosConfig
      )
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
      })
      .catch(error => {
        console.log(`error happened locally ${error}`);
      });
  };

  return (
    <Container>
      <Row>
        <Col className="bg-danger text-light intro-box">
          <h3>Profile</h3>
          <p>
            To update your details just add the new details in the form and
            press update or to delete your account use the button below
          </p>
          <Button className="btn-light" onClick={deleteAccount}>
            Delete Your Account
          </Button>
        </Col>
        <Col>
          <Form noValidate validated={validated} id="update-form">
            <Form.Group controlId="updateUsername">
              <Form.Label>Choose a Username</Form.Label>
              <Form.Control
                required
                type="username"
                placeholder={props.user}
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please choose a username
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="updateemail">
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
            <Form.Group controlId="updatePassword">
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
            <Form.Group controlId="updateBirthday">
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
              onClick={handleUpdate}
            >
              Update Details
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
