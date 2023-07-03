import { Col, Container, Row } from "react-bootstrap";

export function PanelFormLayout({ children }) {
  return (
    <Container className="g-0">
      <Row className="justify-content-md-center my-3">
        <Col xs lg={8}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}
