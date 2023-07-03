import { Col, Container, Row } from "react-bootstrap";

import { Title } from "src/components/miscellaneous";

import { Body } from "./Body";
import { Header } from "./Header";

export function ProfileDetails({ profile }) {
  if (!profile) return null;

  return (
    <>
      <Title text="Detalle del perfil" />
      <Container>
        <Row className="justify-content-center my-3">
          <Col lg={7} className="card">
            <Container className="my-3">
              <Header profile={profile} />
              <Body profile={profile} />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
