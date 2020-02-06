import React from "react";
import Navbar from "react-bootstrap/Navbar";

import "./nav-bar.scss";

export function Navigation(user) {
  const url = `/client/profile/${user.user}`;
  return (
    <Navbar bg="danger" variant="dark" className="navigation-bar">
      <Navbar.Brand href="/client">MyFlix DB</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="text-light">
        <a href="/client" className="text-light">
          Home
        </a>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="text-light" href={url}>
          {user.user ? `Welcome ${user.user} |` : ""}{" "}
          {user.user ? <a href={url}> Profile </a> : ""}{" "}
          {user.user ? <a href="/client/logout">| Log Out</a> : ""}
        </Navbar.Text>
      </Navbar.Collapse>{" "}
    </Navbar>
  );
}
