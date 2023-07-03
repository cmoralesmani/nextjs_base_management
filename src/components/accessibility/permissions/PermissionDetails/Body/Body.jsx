import { Col, Row } from "react-bootstrap";

import * as sections from "./sections";

export function Body({ permission }) {
  return (
    <>
      <Row>
        <Col>
          <Row as="dl">
            <Col as="dt" xs={12}>
              ID:
            </Col>
            <Col as="dd" xs={12}>
              {permission.id_permission}
            </Col>
          </Row>
        </Col>
        <Col>
          <Row as="dl">
            <Col as="dt" xs={12}>
              Nombre:
            </Col>
            <Col as="dd" xs={12}>
              {permission.de_permission}
            </Col>
          </Row>
        </Col>
      </Row>
      <sections.ProfilesSection profiles={permission.profiles} />
      <sections.UsersSection users={permission.users} />
    </>
  );
}
