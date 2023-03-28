// src/components/templates/User/UserList/UserListTable.jsx

import Link from "next/link";
import PropTypes from "prop-types";
import { Alert, Badge, Col, Container, Row, Table } from "react-bootstrap";
import {
  FaFileCsv,
  FaPlus,
  FaRegEdit,
  FaFolderOpen,
  FaBan,
} from "react-icons/fa";

import {
  SpinnerCustom,
  ButtonDownload,
  ButtonDeleteConfirm,
} from "src/components/elements";
import { hasPermission } from "src/helpers/utils";
import { useHasPermissionStatus } from "src/hooks";

import styles from "../../../../../styles/TableFixedHeader.module.scss";

export { UserListTable };

UserListTable.propTypes = {
  users: PropTypes.array,
  urlDownload: PropTypes.string,
  deleteUserCallback: PropTypes.func.isRequired,
};

function UserListTable({ users, urlDownload, deleteUserCallback }) {
  const permissions = useHasPermissionStatus([
    "CUEUS-VER",
    "CUEUS-CREAR",
    "CUEUS-MODIF",
    "CUEUS-ELIMI",
  ]);
  const hasPermissionSeeUsers = hasPermission(permissions, "CUEUS-VER");
  const hasPermissionCreateUser = hasPermission(permissions, "CUEUS-CREAR");
  const hasPermissionEditUser = hasPermission(permissions, "CUEUS-MODIF");
  const hasPermissionDeleteUser = hasPermission(permissions, "CUEUS-ELIMI");

  return (
    <Container className="g-0">
      <Row className="justify-content-center">
        <Col md={10}>
          <Container className="g-0 mb-3">
            <Row className="row-cols-auto justify-content-between">
              <Col className="fs-5">
                <Badge bg="light" text="dark">
                  Total: {(users || []).length}
                </Badge>
              </Col>
              <Col>
                <Row className="row-cols-auto">
                  {hasPermissionCreateUser && (
                    <Col>
                      <Link href="/accounts/register">
                        <a className="btn btn-primary btn-sm">
                          <FaPlus /> Nuevo
                        </a>
                      </Link>
                    </Col>
                  )}
                  {urlDownload && (
                    <ButtonDownload
                      buttonLabel="Exportar"
                      buttonIcon={<FaFileCsv />}
                      idPermission="CUEUS-EXPOR"
                      url={urlDownload}
                    />
                  )}
                </Row>
              </Col>
            </Row>
          </Container>
          <div className={`${styles.tableFixedHead}`}>
            <Table bordered hover responsive size="sm">
              <thead className="table-secondary">
                <tr>
                  <th>Nombre de Usuario</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Estado</th>
                  {(hasPermissionSeeUsers ||
                    hasPermissionEditUser ||
                    hasPermissionDeleteUser) &&
                    users &&
                    users.length > 0 && <th></th>}
                </tr>
              </thead>

              <tbody>
                {users &&
                  users.map((user) => (
                    <tr key={user.id_usuario}>
                      <td>
                        {hasPermissionSeeUsers ? (
                          <Link href={`/accounts/details/${user.id_usuario}`}>
                            <a>{user.username}</a>
                          </Link>
                        ) : (
                          user.username
                        )}
                      </td>
                      <td>{user.nom_usuario}</td>
                      <td>{user.ape_usuario}</td>
                      <td>
                        {user.es_usuario == "ESCUS-ACTIV" ? (
                          <Badge bg="success">{user.de_es_usuario}</Badge>
                        ) : (
                          <Badge bg="danger">{user.de_es_usuario}</Badge>
                        )}
                      </td>
                      {(hasPermissionSeeUsers ||
                        hasPermissionEditUser ||
                        hasPermissionDeleteUser) && (
                        <td className="text-center text-nowrap">
                          {hasPermissionSeeUsers && (
                            <Link href={`/accounts/details/${user.id_usuario}`}>
                              <a className="mx-1">
                                <FaFolderOpen />
                              </a>
                            </Link>
                          )}
                          {hasPermissionEditUser && (
                            <Link href={`/accounts/edit/${user.id_usuario}`}>
                              <a className="mx-1">
                                <FaRegEdit />
                              </a>
                            </Link>
                          )}
                          {hasPermissionDeleteUser && (
                            <ButtonDeleteConfirm
                              message={`Esta seguro que desea eliminar el usuario ${user.username}?`}
                              callbackDelete={() => {
                                return deleteUserCallback(user.id_usuario);
                              }}
                            />
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          {!users && <SpinnerCustom />}
          {users && !users.length && (
            <Alert variant="warning">
              <FaBan className="me-1" />
              No hay usuarios para mostrar
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}
