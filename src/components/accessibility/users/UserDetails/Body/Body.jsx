import Link from "next/link";
import { Badge, Col, Row } from "react-bootstrap";

import * as sections from "./sections";

export function Body({ user }) {
  return (
    <>
      <Row>
        <Col>
          <Row as="dl">
            <Col as="dt" xs={12}>
              Nombre:
            </Col>
            <Col as="dd" xs={12}>
              {user.name_user}
            </Col>
          </Row>
        </Col>
        <Col>
          <Row as="dl">
            <Col as="dt" xs={12}>
              Apellido:
            </Col>
            <Col as="dd" xs={12}>
              {user.lastname_user}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row as="dl">
            <Col as="dt" xs={12}>
              Sexo:
            </Col>
            <Col as="dd" xs={12}>
              {user.de_gender_user}
            </Col>
          </Row>
        </Col>
        <Col xs={6}>
          <Row as="dl">
            <Col as="dt" xs={12}>
              Número Telefónico
            </Col>
            <Col as="dd" xs={12}>
              <Link href={`tel:${user.phone_contact}`}>
                {user.phone_contact}
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row as="dl">
            <Col as="dt" xs={12}>
              Correo:
            </Col>
            <Col as="dd" xs={12}>
              <Link href={`mailto:${user.email_usuario}`}>{user.email}</Link>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row as="dl">
            <Col as="dt" xs={12}>
              Estado:
            </Col>
            <Col as="dd" xs={12}>
              {user.status_user_id == "ESCUS-ACTIV" ? (
                <Badge bg="success">{user.de_status_user}</Badge>
              ) : (
                <Badge bg="danger">{user.de_status_user}</Badge>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <sections.TimestampSection user={user} />
      <sections.ProfilesSection profiles={user.profiles} />
      <sections.PermissionsSection permissions={user.permissions} />
      <sections.PermissionsTotalSection permissions={user.user_permissions} />
      <sections.ChangePasswordSection user={user} />
    </>
  );
}
