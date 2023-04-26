// src/components/accounts/UserList/UserListTable.jsx

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

import { useHasPermissionStatus } from "src/hooks/auth";
import {
  SpinnerCustom,
  ButtonDownload,
  ButtonDeleteConfirm,
} from "src/components/elements";

import styles from "styles/TableFixedHeader.module.scss";

export { UserListTable };

UserListTable.propTypes = {
  users: PropTypes.array,
  urlDownload: PropTypes.string,
  deleteUserCallback: PropTypes.func.isRequired,
};

function UserListTable({ users, urlDownload, deleteUserCallback }) {
  const hasPermissionSeeUser = useHasPermissionStatus({
    codenamePermission: "see_single_user",
  });
  const hasPermissionCreateUser = useHasPermissionStatus({
    codenamePermission: "create_user",
  });
  const hasPermissionEditUser = useHasPermissionStatus({
    codenamePermission: "alter_user",
  });
  const hasPermissionDeleteUser = useHasPermissionStatus({
    codenamePermission: "delete_user",
  });

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
                      <Link
                        href="/accessibility/accounts/register"
                        className="btn btn-primary btn-sm"
                      >
                        <FaPlus /> Nuevo
                      </Link>
                    </Col>
                  )}
                  {urlDownload && (
                    <ButtonDownload
                      buttonLabel="Exportar"
                      buttonIcon={<FaFileCsv />}
                      idPermission="export_users"
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
                  <th>Nombre de usuario</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Estado</th>
                  {(hasPermissionSeeUser ||
                    hasPermissionEditUser ||
                    hasPermissionDeleteUser) &&
                    users &&
                    users.length > 0 && <th></th>}
                </tr>
              </thead>

              <tbody>
                {users &&
                  users.map((user) => (
                    <tr key={user.id_user}>
                      <td>
                        {hasPermissionSeeUser ? (
                          <Link
                            href={`/accessibility/accounts/details/${user.id_user}`}
                          >
                            {user.username}
                          </Link>
                        ) : (
                          user.username
                        )}
                      </td>
                      <td>{user.name_user}</td>
                      <td>{user.lastname_user}</td>
                      <td>
                        {user.status_user_id == "ESCUS-ACTIV" ? (
                          <Badge bg="success">{user.de_status_user}</Badge>
                        ) : (
                          <Badge bg="danger">{user.de_status_user}</Badge>
                        )}
                      </td>
                      {(hasPermissionSeeUser ||
                        hasPermissionEditUser ||
                        hasPermissionDeleteUser) && (
                        <td className="text-center text-nowrap">
                          {hasPermissionSeeUser && (
                            <Link
                              href={`/accessibility/accounts/details/${user.id_user}`}
                              className="mx-1"
                            >
                              <FaFolderOpen />
                            </Link>
                          )}
                          {hasPermissionEditUser && (
                            <Link
                              href={`/accessibility/accounts/edit/${user.id_user}`}
                              className="mx-1"
                            >
                              <FaRegEdit />
                            </Link>
                          )}
                          {hasPermissionDeleteUser && (
                            <ButtonDeleteConfirm
                              message={`Esta seguro que desea eliminar el usuario ${user.username}?`}
                              callbackDelete={() => {
                                return deleteUserCallback(user.id_user);
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
