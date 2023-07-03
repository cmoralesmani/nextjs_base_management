import { Col, Container, Row } from "react-bootstrap";

import { Title } from "src/components/miscellaneous";

import { Body } from "./Body";
import { Header } from "./Header";

export function PermissionDetails({ permission }) {
  if (!permission) return null;

  return (
    <>
      <Title text="Detalle del permiso" />
      <Container>
        <Row className="justify-content-center my-3">
          <Col lg={7} className="card">
            <Container className="my-3">
              <Header permission={permission} />
              <Body permission={permission} />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
