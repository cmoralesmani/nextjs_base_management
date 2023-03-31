// app/components/templates/TitleSite/TitleSite.jsx

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { FaArrowCircleLeft, FaBars } from "react-icons/fa";

import { useAuth } from "src/hooks/auth";
import { titleService } from "src/services";

import logo from "assets/images/logo.svg";

export { TitlePage };

function TitlePage() {
  const [title, setTitle] = useState("");
  const router = useRouter();
  const { auth } = useAuth();

  useEffect(() => {
    const subscription = titleService.title.subscribe((x) => setTitle(x));
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Solo se muestra el Sidebar si esta logeado
  // if (!user) return null;
  if (!auth) return null;

  return (
    <Navbar bg="white" className="shadow-sm" expand="lg" sticky="top">
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
