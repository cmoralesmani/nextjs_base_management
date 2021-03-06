// app/components/templates/Profile/ProfileDetails.jsx

import Link from "next/link";
import { Alert, Badge, Col, Container, ListGroup, Row } from "react-bootstrap";
import { FaIdCard, FaRegEdit, FaListAlt } from "react-icons/fa";

import { hasPermission } from "@app/helpers/utils";
import { useHasPermissionStatus } from "@app/hooks";
import { userService } from "@app/services";

export { ProfileDetails };

function ProfileDetails(props) {
  const profile = props?.profile;

  const permissions = useHasPermissionStatus([
    "PERFI-MODIF",
    "PERFI-LISTA",
    "CUEUS-VER",
  ]);
  const hasPermissionEditProfile = hasPermission(permissions, "PERFI-MODIF");
  const hasPermissionListProfile = hasPermission(permissions, "PERFI-LISTA");
  const hasPermissionSeeUser = hasPermission(permissions, "CUEUS-VER");

  if (!profile) return null;

  return (
    <Container>
      <Row className="justify-content-center my-3">
        <Col lg={7} className="card">
          <Container className="my-3">
            <Row>
              <Col className="text-center">
                {hasPermissionEditProfile && (
                  <Link href={`/profiles/edit/${profile.perfil.id_perfil}`}>
                    <a className="btn btn-link float-end">
                      <FaRegEdit />
                    </a>
                  </Link>
                )}
                {hasPermissionListProfile && (
                  <Link href={`/accounts`}>
                    <a
                      className="btn btn-link float-end"
                      title="Lista de usuarios"
                    >
                      <FaListAlt />
                    </a>
                  </Link>
                )}
                <h3>
                  <FaIdCard /> {profile.perfil.id_perfil}
                </h3>
                <hr className="mb-3" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Row as="dl">
                  <Col as="dt" xs={12}>
                    ID:
                  </Col>
                  <Col as="dd" xs={12}>
                    {profile.perfil.id_perfil}
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row as="dl">
                  <Col as="dt" xs={12}>
                    Nombre:
                  </Col>
                  <Col as="dd" xs={12}>
                    {profile.perfil.de_perfil}
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
                    {profile.perfil.es_perfil == "ESPER-ACTIV" ? (
                      <Badge bg="success">{profile.perfil.de_es_perfil}</Badge>
                    ) : (
                      <Badge bg="danger">{profile.perfil.de_es_perfil}</Badge>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <h4>
                  Usuarios
                  <Badge className="ms-2" bg="light" text="dark">
                    {(profile.perfil.usuarios || []).length}
                  </Badge>
                </h4>
                {!profile.perfil.usuarios?.length ? (
                  <Alert variant="warning">No tiene usuarios asignados</Alert>
                ) : (
                  <ListGroup>
                    {profile.perfil.usuarios.map((usuario) => {
                      return (
                        <ListGroup.Item
                          key={usuario.id_usuario}
                          variant="secondary"
                        >
                          {hasPermissionSeeUser ||
                          usuario.id_usuario ===
                            userService.userValue.id_user ? (
                            <>
                              <Link
                                href={`/accounts/details/${usuario.id_usuario}`}
                              >
                                <a>
                                  {usuario.nom_usuario} {usuario.ape_usuario}
                                </a>
                              </Link>
                              <Badge className="ms-2" bg="info">
                                {usuario.username}
                              </Badge>
                            </>
                          ) : (
                            <>
                              {usuario.nom_usuario} {usuario.ape_usuario}{" "}
                              <Badge bg="info">{usuario.username}</Badge>
                            </>
                          )}
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                )}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <h4>
                  Permisos
                  <Badge className="ms-2" bg="light" text="dark">
                    {(profile.perfil.permisos || []).length}
                  </Badge>
                </h4>
                {!profile.perfil.permisos?.length ? (
                  <Alert variant="warning">No tiene permisos asignados</Alert>
                ) : (
                  <ListGroup>
                    {profile.perfil.permisos.map((permiso) => {
                      return (
                        <ListGroup.Item
                          key={permiso.id_permiso}
                          variant="secondary"
                        >
                          <span>{permiso.de_permiso_grupo}</span>{" "}
                          <Badge className="ms-2" bg="info">
                            {permiso.de_permiso_accion}
                          </Badge>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                )}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
