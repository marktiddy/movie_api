import React from "react";
import Navbar from "react-bootstrap/Navbar";

import "./nav-bar.scss";

export function Navigation(user) {
  return (
    <Navbar bg="danger" variant="dark" className="navigation-bar">
      <Navbar.Brand href="/">MyFlix DB</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="text-light">
        <a href="/" className="text-light">
          Home
        </a>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="text-light">
          {user.user ? `Welcome ${user.user} |` : ""}{" "}
          {user.user ? <a href="/logout">Log Out</a> : ""}
        </Navbar.Text>
      </Navbar.Collapse>{" "}
    </Navbar>
  );
}
