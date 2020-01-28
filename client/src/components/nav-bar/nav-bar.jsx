import React from "react";
import Navbar from "react-bootstrap/Navbar";

import "./nav-bar.scss";

export function Navigation() {
  return (
    <Navbar bg="danger" variant="dark" className="navigation-bar">
      <Navbar.Brand href="#">MyFlix DB</Navbar.Brand>
    </Navbar>
  );
}
