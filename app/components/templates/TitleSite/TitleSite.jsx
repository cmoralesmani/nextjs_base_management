// app/components/templates/TitleSite/TitleSite.jsx

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { FaArrowCircleLeft, FaBars } from "react-icons/fa";

import { titleService, userService } from "@app/services";

import logo from "../../../../assets/images/logo.svg";

export { TitleSite };

function TitleSite({ handleToggleSidebar }) {
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const subscriptionUser = userService.user.subscribe((x) => setUser(x));
    const subscription = titleService.title.subscribe((x) => setTitle(x));
    return () => {
      subscriptionUser.unsubscribe();
      subscription.unsubscribe();
    };
  }, []);

  // Solo se muestra el Sidebar si esta logeado
  if (!user) return null;

  return (
    <Navbar bg="white" className="shadow-sm" expand="lg" sticky="top">
      <div
        className="btn-toggle float-start mt-2 ms-2"
        onClick={() => handleToggleSidebar(true)}
      >
        <FaBars />
      </div>
      <Container>
        <Navbar.Brand className="justify-content-start">
          <h1>
            <Button
              size="lg"
              className="me-2 p-0"
              variant="link"
              onClick={() => router.back()}
            >
              <FaArrowCircleLeft className="me-1" />
            </Button>
            {title}
          </h1>
        </Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Item>
            <Image src={logo} width="100" height="50" />
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}
