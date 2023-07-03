import PropTypes from "prop-types";
import { Alert, Table } from "react-bootstrap";
import { FaBan } from "react-icons/fa";

import { Spinner } from "src/components/spinner";
import { useHasPermissionStatus } from "src/hooks/auth";

import { Head } from "./Head";
import { Body } from "./Body";

import styles from "styles/TableFixedHeader.module.scss";

export { ListTable };

ListTable.propTypes = {
  users: PropTypes.array,
  deleteUserCallback: PropTypes.func.isRequired,
};

function ListTable({ users, deleteUserCallback }) {
  const hasPermissionSeeUser = useHasPermissionStatus({
    codenamePermission: "see_single_user",
  });
  const hasPermissionEditUser = useHasPermissionStatus({
    codenamePermission: "alter_user",
  });
  const hasPermissionDeleteUser = useHasPermissionStatus({
    codenamePermission: "delete_user",
  });

  const hasActionButtons =
    (hasPermissionSeeUser ||
      hasPermissionEditUser ||
      hasPermissionDeleteUser) &&
    users &&
    users.length;

  return (
    <>
      <div className={`${styles.tableFixedHead}`}>
        <Table bordered hover responsive size="sm">
          <Head hasActionButtons={!!hasActionButtons} />
          <Body
            users={users}
            hasActionButtons={!!hasActionButtons}
            deleteUserCallback={deleteUserCallback}
          />
        </Table>
      </div>
      {!users && <Spinner />}
      {users && !users.length && (
        <Alert variant="warning">
          <FaBan className="me-1" />
          No hay usuarios para mostrar
        </Alert>
      )}
    </>
  );
}
