// app/components/templates/User/UserDetails.jsx

const moment = require("moment");
import Link from "next/link";
import {
  Alert,
  Badge,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";
import { FaEdit, FaListAlt, FaUser, FaUserTie } from "react-icons/fa";

import { ResetPassword } from "@app/components/templates/ResetPassword";
import { hasPermission } from "@app/helpers/utils";
import { useHasPermissionStatus } from "@app/hooks";
import { userService } from "@app/services";

export { UserDetails };

function UserDetails(props) {
  const user = props?.user;

  const permissions = useHasPermissionStatus([
    "CUEUS-LISTA",
    "PERFI-VER",
    "EMPRE-VER",
    "CUEUS-VER",
  ]);
  const hasPermissionListUsers = hasPermission(permissions, "CUEUS-LISTA");
  const hasPermissionSeeProfile = hasPermission(permissions, "PERFI-VER");
  const hasPermissionSeeUsers = hasPermission(permissions, "CUEUS-VER");

  const PermissionsWithCallback = useHasPermissionStatus(
    ["CUEUS-MODIF", "CUEUS-CAMCA"],
    allowSelfUser
  );
  const hasPermissionEditUser = hasPermission(
    PermissionsWithCallback,
    "CUEUS-MODIF"
  );
  const hasPermissionChangePassword = hasPermission(
    PermissionsWithCallback,
    "CUEUS-CAMCA"
  );

  function allowSelfUser(setPermissions) {
    /*
    Callback que recibe la funcion que modifica los permisos
    y se establece en verdadero si el usuario que esta intentando
    editar es el mismo que esta autenticado.
    */
    if (user.id_usuario === userService.userValue.id_user) {
      setPermissions((permissions) => {
        return (permissions || []).map((p) => {
          p.has_permission = true;
          return p;
        });
      });
    }
  }

  if (!user) return null;

  return (
    <>
      <Container>
        <Row className="justify-content-md-center px-0">
          <Col xs lg={9} className="card my-3">
            <Row>
              <Col
                lg={3}
                className="bg-info text-white d-flex justify-content-center align-items-center"
              >
                <FaUserTie size={100} className="my-5" />
              </Col>
              <Col lg={9}>
                <Container className="my-3">
                  <Row>
                    <Col className="py-2">
                      {hasPermissionEditUser && (
                        <Link href={`/accounts/edit/${user.id_usuario}`}>
                          <a
                            className="btn btn-link float-end"
                            title="Editar usuario"
                          >
                            <FaEdit />
                          </a>
                        </Link>
                      )}
                      {hasPermissionListUsers && (
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
                        <FaUser /> {user.username}
                        {user.id_usuario === userService.userValue.id_user && (
                          <Badge className="ms-2" bg="info" size="lg">
                            Mi usuario
                          </Badge>
                        )}
                      </h3>
                      <hr className="mb-3" />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Row as="dl">
                        <Col as="dt" xs={12}>
                          Nombre:
                        </Col>
                        <Col as="dd" xs={12}>
                          {user.nom_usuario}
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row as="dl">
                        <Col as="dt" xs={12}>
                          Apellido:
                        </Col>
                        <Col as="dd" xs={12}>
                          {user.ape_usuario}
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
                          {user.de_sex_usuario}
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={6}>
                      <Row as="dl">
                        <Col as="dt" xs={12}>
                          Número Telefónico
                        </Col>
                        <Col as="dd" xs={12}>
                          <Link href={`tel:${user.tel_contacto}`}>
                            <a>{user.tel_contacto}</a>
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
                          <Link href={`mailto:${user.email_usuario}`}>
                            <a>{user.email}</a>
                          </Link>
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
                          {user.es_usuario == "ESCUS-ACTIV" ? (
                            <Badge bg="success">{user.de_es_usuario}</Badge>
                          ) : (
                            <Badge bg="danger">{user.de_es_usuario}</Badge>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
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
                                  {moment(user.fe_creacion).format(
                                    "DD/MM/YYYY h:mm:ss a"
                                  )}
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
                                      href={`/accounts/details/${user.id_usuario_creacion}`}
                                    >
                                      <a>{user.usr_creacion}</a>
                                    </Link>
                                  ) : (
                                    user.usr_creacion
                                  )}
                                  <span className="ms-2">
                                    ({user.nom_usuario_creacion}{" "}
                                    {user.ape_usuario_creacion})
                                  </span>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <h4>
                        Perfiles
                        <Badge className="ms-2" bg="light" text="dark">
                          {(user.perfiles || []).length}
                        </Badge>
                      </h4>
                      {!user.perfiles?.length ? (
                        <Alert variant="warning">
                          No tiene perfiles asignados
                        </Alert>
                      ) : (
                        <ListGroup as="ol" numbered>
                          {user.perfiles.map((perfil) => {
                            return (
                              <ListGroup.Item
                                key={perfil.id_perfil}
                                as="li"
                                variant="secondary"
                              >
                                {hasPermissionSeeProfile ? (
                                  <Link
                                    href={`/profiles/details/${perfil.id_perfil}`}
                                  >
                                    <a>{perfil.de_perfil}</a>
                                  </Link>
                                ) : (
                                  <>{perfil.de_perfil}</>
                                )}
                              </ListGroup.Item>
                            );
                          })}
                        </ListGroup>
                      )}
                    </Col>
                  </Row>
                  {hasPermissionChangePassword && (
                    <Row>
                      <Col className="mt-3">
                        <ResetPassword user={user} />
                      </Col>
                    </Row>
                  )}
                </Container>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
