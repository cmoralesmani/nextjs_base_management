import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { Title } from "src/components/miscellaneous";

import { ActionButtons } from "./ActionButtons";
import { ListForm } from "./ListForm";
import { ListTable } from "./ListTable";

export function PermissionsList({ permissions, loadPermissionsCallback }) {
  const [urlDownload, setUrlDownload] = useState();

  return (
    <>
      <Title text="Permisos de la aplicación" />
      <ListForm
        updatePermissionsCallback={loadPermissionsCallback}
        setUrlDownload={setUrlDownload}
      />
      <Container className="g-0">
        <Row className="justify-content-center">
          <Col md={10}>
            <ActionButtons
              lengthInfo={(permissions || []).length}
              urlDownload={urlDownload}
            />
            <ListTable permissions={permissions} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
