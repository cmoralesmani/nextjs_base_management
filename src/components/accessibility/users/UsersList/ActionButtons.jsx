import Link from "next/link";
import { Badge, Col, Container, Row } from "react-bootstrap";
import { FaFileCsv, FaPlus } from "react-icons/fa";

import { ButtonDownload } from "src/components/buttons";
import { useHasPermissionStatus } from "src/hooks/auth";

export function ActionButtons({ lengthInfo, urlDownload }) {
  const hasPermissionCreateUser = useHasPermissionStatus({
    codenamePermission: "create_user",
  });

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
            <Col>
              {hasPermissionCreateUser && (
                <Link
                  href="/accessibility/users/create"
                  className="btn btn-primary btn-sm"
                >
                  <FaPlus /> Nuevo
                </Link>
              )}
            </Col>
            {urlDownload && (
              <ButtonDownload
                buttonLabel="Exportar"
                buttonIcon={<FaFileCsv />}
                idPermission="export_users"
                url={urlDownload}
              />
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
