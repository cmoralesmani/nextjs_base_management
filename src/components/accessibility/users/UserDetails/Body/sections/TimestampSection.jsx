import Link from "next/link";
import { Card, Col, Row } from "react-bootstrap";
import { useHasPermissionStatus } from "src/hooks/auth";

const moment = require("moment");

export function TimestampSection({ user }) {
  const hasPermissionSeeUsers = useHasPermissionStatus({
    codenamePermission: "see_single_user",
  });
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>Marca</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Row as="dl">
                  <Col as="dt" xs={12}>
                    F. Creación:
                  </Col>
                  <Col as="dd" xs={12}>
                    {moment(user.created_at).format("DD/MM/YYYY h:mm:ss a")}
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row as="dl">
                  <Col as="dt" xs={12}>
                    Usuario:
                  </Col>
                  <Col as="dd" xs={12}>
                    {hasPermissionSeeUsers ? (
                      <Link
                        href={`/accessibility/users/details/${user.id_user_creacion}`}
                      >
                        {user.CREATED_BY}
                      </Link>
                    ) : (
                      user.CREATED_BY
                    )}
                    <span className="ms-2">
                      ({user.name_user_creacion} {user.lastname_user_creacion})
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
