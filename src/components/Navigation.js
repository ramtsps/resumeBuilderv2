import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <Navbar bg="light" variant="light" className="border-bottom" sticky="top">
      <Container>
        <Navbar.Brand>
          <NavLink to="/" className="text-decoration-none text-black">
            <img
              src="./images/tspsram.png"
              style={{ width: "100%", height: "30px", borderRadius: "30px" }}
              alt="Logo"
              className="logo-img"
            />
          </NavLink>
        </Navbar.Brand>

        <Nav
          className="me-auto"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          <NavLink to="/" className="mx-2 text-decoration-none text-black">
            Home
          </NavLink>
          <NavLink to="#" className="mx-2 text-decoration-none text-black">
            About
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
