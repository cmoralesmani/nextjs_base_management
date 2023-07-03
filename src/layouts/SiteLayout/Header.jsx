import Link from "next/link";
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaHome, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

import { NickProfile } from "src/components/miscellaneous";
import { useAuth } from "src/hooks/auth";
import { selectUserState } from "src/redux/slices/user-slice";

import styles from "styles/SiteLayout.module.scss";

export default function Header() {
  const { auth } = useAuth();
  const userState = useSelector(selectUserState);

  return (
    <Navbar className={styles.header}>
      <Container>
        <Navbar.Brand href="/">
          <FaHome />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {!!userState && (
              <Nav.Link
                as={Link}
                href={`/accessibility/users/details/${userState.id_user}`}
              >
                <NickProfile />
              </Nav.Link>
            )}
            {!auth ? (
              <Nav.Link as={Link} href="/login">
                <FaSignInAlt /> <span>Login</span>
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} href="/logout">
                <FaSignOutAlt /> <span>Logout</span>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
