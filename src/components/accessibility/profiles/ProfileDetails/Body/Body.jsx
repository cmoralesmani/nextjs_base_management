import { Col, Row } from "react-bootstrap";

import * as sections from "./sections";

export function Body({ profile }) {
  return (
    <>
      <Row>
        <Col>
          <Row as="dl">
            <Col as="dt" xs={12}>
              ID:
            </Col>
            <Col as="dd" xs={12}>
              {profile.id_profile}
            </Col>
          </Row>
        </Col>
        <Col>
          <Row as="dl">
            <Col as="dt" xs={12}>
              Nombre:
            </Col>
            <Col as="dd" xs={12}>
              {profile.de_profile}
            </Col>
          </Row>
        </Col>
      </Row>
      <sections.UsersSection users={profile.users} />
      <sections.PermissionsSection permissions={profile.permissions} />
    </>
  );
}
