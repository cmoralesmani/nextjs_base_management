import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { Title } from "src/components/miscellaneous";

import { ActionButtons } from "./ActionButtons";
import { ListForm } from "./ListForm";
import { ListTable } from "./ListTable";

export function ProfilesList({
  profiles,
  loadProfilesCallback,
  deleteProfileCallback,
}) {
  const [urlDownload, setUrlDownload] = useState();

  return (
    <>
      <Title text="Perfiles de usuario" />
      <ListForm
        updateProfilesCallback={loadProfilesCallback}
        setUrlDownload={setUrlDownload}
      />
      <Container className="g-0">
        <Row className="justify-content-center">
          <Col md={10}>
            <ActionButtons
              lengthInfo={(profiles || []).length}
              urlDownload={urlDownload}
            />
            <ListTable
              profiles={profiles}
              deleteProfileCallback={deleteProfileCallback}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
