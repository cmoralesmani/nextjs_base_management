import { Col, Container, Row } from "react-bootstrap";

import { Title } from "src/components/miscellaneous";

import { Header } from "./Header";
import { Body } from "./Body";

export function ParametersDetails({ parameter }) {
  if (!parameter) return null;
  return (
    <>
      <Title text="Detalle del parametro" />
      <Container>
        <Row className="justify-content-center my-3">
          <Col lg={7} className="card">
            <Container className="my-3">
              <Header parameter={parameter} />
              <Body parameter={parameter} />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
