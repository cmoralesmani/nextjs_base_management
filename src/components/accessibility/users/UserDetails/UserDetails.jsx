import { Col, Container, Row } from "react-bootstrap";
import { FaUserTie } from "react-icons/fa";

import { Title } from "src/components/miscellaneous";

import { Body } from "./Body";
import { Header } from "./Header";

export function UserDetails({ user }) {
  if (!user) return null;
  return (
    <>
      <Title text="Detalle del usuario" />
      <Container>
        <Row className="justify-content-md-center px-0">
          <Col xs lg={9} className="card my-3">
            <Row>
              <Col
                lg={3}
                className="bg-info text-white d-flex justify-content-center align-items-center"
              >
                <FaUserTie size={100} className="my-5" />
              </Col>
              <Col lg={9}>
                <Container className="my-3">
                  <Header user={user} />
                  <Body user={user} />
                </Container>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
