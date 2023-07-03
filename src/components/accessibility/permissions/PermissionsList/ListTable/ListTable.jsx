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
  permissions: PropTypes.array,
};

function ListTable({ permissions }) {
  const hasPermissionViewPermission = useHasPermissionStatus({
    codenamePermission: "see_single_permission",
  });
  const hasPermissionChangePermission = useHasPermissionStatus({
    codenamePermission: "alter_permission",
  });

  const hasActionButtons =
    (hasPermissionViewPermission || hasPermissionChangePermission) &&
    permissions &&
    permissions.length;

  return (
    <>
      <div className={`${styles.tableFixedHead}`}>
        <Table bordered hover responsive size="sm">
          <Head hasActionButtons={!!hasActionButtons} />
          <Body
            permissions={permissions}
            hasActionButtons={!!hasActionButtons}
          />
        </Table>
      </div>
      {!permissions && <Spinner />}
      {permissions && !permissions.length && (
        <Alert variant="warning">
          <FaBan className="me-1" />
          No hay permisos para mostrar
        </Alert>
      )}
    </>
  );
}
