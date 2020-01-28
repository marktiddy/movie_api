import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//Import SCSS
import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState(""),
    [password, setPassword] = useState(""),
    [email, setEmail] = useState(""),
    [birthday, setBirthday] = useState("1985-08-19");

  const handleSubmit = () => {
    console.log(username, password, email, birthday);
    //Here is where we'd do the request
    props.onLoggedIn(username);
  };

  return (
    <Form>
      <Form.Group controlId="formUserName">
        <Form.Label>Choose a Username</Form.Label>
        <Form.Control
          type="username"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Choose a password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Form.Text className="text-muted">Enter a new password</Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicBirthday">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          placeholder="Enter your birthday"
          type="datetime-local"
          value={birthday}
          onChange={e => setBirthday(e.target.value)}
        />
        <Form.Text className="text-muted">Format: YYYY-MM-DD</Form.Text>
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
  );
}

RegistrationView.propType = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.instanceOf(Date).isRequired
};
