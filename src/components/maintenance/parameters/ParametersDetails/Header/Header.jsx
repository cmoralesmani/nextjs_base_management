import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { FaIdCard, FaListAlt, FaRegEdit } from "react-icons/fa";

import { useHasPermissionStatus } from "src/hooks/auth";

export function Header({ parameter }) {
  const hasPermissionChangeParameter = useHasPermissionStatus({
    codenamePermission: "alter_parameter",
  });
  const hasPermissionViewParameters = useHasPermissionStatus({
    codenamePermission: "see_parameters",
  });
  return (
    <Row>
      <Col className="text-center">
        {hasPermissionChangeParameter && (
          <Link
            href={`/maintenance/parameters/edit/${parameter.id_definicion_m}`}
            className="btn btn-link float-end"
            title="Editar el parametro"
          >
            <FaRegEdit />
          </Link>
        )}
        {hasPermissionViewParameters && (
          <Link
            href={`/maintenance/parameters/list`}
            className="btn btn-link float-end"
            title="Lista de parametros"
          >
            <FaListAlt />
          </Link>
        )}
        <h3>
          <FaIdCard /> {parameter.de_definicion_m}
        </h3>
        <hr className="mb-3" />
      </Col>
    </Row>
  );
}
