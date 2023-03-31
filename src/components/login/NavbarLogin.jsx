// src/components/login/NavbarLogin.jsx

import React from "react";
import { Container, Navbar } from "react-bootstrap";

export function NavbarLogin() {
  return (
    <Navbar
      bg="primary"
      variant="dark"
      className="fixed-top navbar-expand-lg scrolling-navbar"
    >
      <Container>
        <Navbar.Brand>NEXT JS</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
