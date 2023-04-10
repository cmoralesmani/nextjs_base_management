// src/components/templates/User/UserDetails.jsx

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
import { useSelector } from "react-redux";

import { ResetPassword } from "src/components/templates/ResetPassword";
import { hasPermission } from "src/helpers/utils";
import { useHasPermissionStatus } from "src/hooks/auth";
import { userService } from "src/services";

import { selectUserState } from "src/redux/slices/user-slice";

export { UserDetails };

function UserDetails(props) {
  const { user } = props;
  const userState = useSelector(selectUserState);

  const hasPermissionListUsers = useHasPermissionStatus({
    codenamePermission: "see_users",
  });
  const hasPermissionSeeProfile = useHasPermissionStatus({
    codenamePermission: "see_single_profile",
  });
  const hasPermissionSeeUsers = useHasPermissionStatus({
    codenamePermission: "see_single_user",
  });

  const hasPermissionAlterUser = useHasPermissionStatus({
    codenamePermission: "alter_user",
    callback: allowSelfUser,
  });
  const hasPermissionChangePassword = useHasPermissionStatus({
    codenamePermission: "change_password_users",
    callback: allowSelfUser,
  });

  function allowSelfUser(params) {
    /*
    Callback que recibe la funcion que modifica los permisos
    y se establece en verdadero si el usuario que esta intentando
    editar es el mismo que esta autenticado.
    */
    const { id_user, setHasPermission } = params;
    if (user.id_user === id_user) {
      setHasPermission(true);
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
                      {hasPermissionAlterUser && (
                        <Link
                          href={`/accessibility/accounts/edit/${user.id_user}`}
                        >
                          <a
                            className="btn btn-link float-end"
                            title="Editar usuario"
                          >
                            <FaEdit />
                          </a>
                        </Link>
                      )}
                      {hasPermissionListUsers && (
                        <Link href={`/accessibility/accounts`}>
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
                        {user.id_user === userState.id_user && (
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
                            <a>{user.phone_contact}</a>
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
                          {user.status_user_id == "ESCUS-ACTIV" ? (
                            <Badge bg="success">{user.de_status_user}</Badge>
                          ) : (
                            <Badge bg="danger">{user.de_status_user}</Badge>
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
                                  {moment(user.created_at).format(
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
                                      href={`/accessibility/accounts/details/${user.id_user_creacion}`}
                                    >
                                      <a>{user.CREATED_BY}</a>
                                    </Link>
                                  ) : (
                                    user.CREATED_BY
                                  )}
                                  <span className="ms-2">
                                    ({user.name_user_creacion}{" "}
                                    {user.lastname_user_creacion})
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
                          {(user.profiles || []).length}
                        </Badge>
                      </h4>
                      {!user.profiles?.length ? (
                        <Alert variant="warning">
                          No tiene perfiles asignados
                        </Alert>
                      ) : (
                        <ListGroup as="ol" numbered>
                          {user.profiles.map((perfil) => {
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
