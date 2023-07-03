import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { FaRegHandshake, FaListAlt, FaRegEdit } from "react-icons/fa";

import { useHasPermissionStatus } from "src/hooks/auth";

export function Header({ permission }) {
  // const hasPermissionChangeProfile = useHasPermissionStatus({
  //   codenamePermission: "alter_profile",
  // });
  const hasPermissionViewPermissions = useHasPermissionStatus({
    codenamePermission: "see_permissions",
  });
  return (
    <Row>
      <Col className="text-center">
        {/* {hasPermissionChangeProfile && (
          <Link
            href={`/accessibility/profiles/edit/${permission.id_profile}`}
            className="btn btn-link float-end"
            title="Editar perfil"
          >
            <FaRegEdit />
          </Link>
        )} */}
        {hasPermissionViewPermissions && (
          <Link
            href={`/accessibility/permissions/list`}
            className="btn btn-link float-end"
            title="Lista de permisos"
          >
            <FaListAlt />
          </Link>
        )}
        <h3>
          <FaRegHandshake /> Detalle del permiso
        </h3>
        <hr className="mb-3" />
      </Col>
    </Row>
  );
}
