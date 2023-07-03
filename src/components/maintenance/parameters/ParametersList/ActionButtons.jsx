import { Badge, Col, Container, Row } from "react-bootstrap";
import { FaFileCsv } from "react-icons/fa";

import { ButtonDownload } from "src/components/buttons";

export function ActionButtons({ lengthInfo, urlDownload }) {
  return (
    <Container className="g-0 mb-3">
      <Row className="row-cols-auto justify-content-between">
        <Col className="text-center fs-5">
          <Badge bg="light" text="dark">
            Total: {lengthInfo}
          </Badge>
        </Col>
        <Col>
          <Row className="row-cols-auto">
            {urlDownload && (
              <ButtonDownload
                buttonLabel="Exportar"
                buttonIcon={<FaFileCsv />}
                idPermission="export_parameters"
                url={urlDownload}
              />
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
