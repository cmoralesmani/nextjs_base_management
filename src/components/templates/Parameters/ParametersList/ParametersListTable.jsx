// src/components/templates/Parameters/ParametersList/ParametersListTable.jsx

import Link from "next/link";
import PropTypes from "prop-types";
import { Alert, Badge, Col, Container, Row, Table } from "react-bootstrap";
import { FaBan, FaFileCsv, FaRegEdit, FaFolderOpen } from "react-icons/fa";

import { SpinnerCustom, ButtonDownload } from "src/components/elements";
import { hasPermission } from "src/helpers/utils";
import { useHasPermissionStatus } from "src/hooks";

import styles from "styles/TableFixedHeader.module.scss";

export { ParametersListTable };

ParametersListTable.propTypes = {
  parameters: PropTypes.array,
  urlDownload: PropTypes.string,
};

function ParametersListTable({ parameters, urlDownload }) {
  const permissions = useHasPermissionStatus([
    "see_single_parameter",
    "alter_parameter",
  ]);
  const hasPermissionSeeParameters = hasPermission(
    permissions,
    "see_single_parameter"
  );
  const hasPermissionEditParameters = hasPermission(
    permissions,
    "alter_parameter"
  );

  return (
    <Container className="g-0">
      <Row className="justify-content-center">
        <Col md={10}>
          <Container className="g-0 mb-3">
            <Row className="row-cols-auto justify-content-between">
              <Col className="text-center fs-5">
                <Badge bg="light" text="dark">
                  Total: {(parameters || []).length}
                </Badge>
              </Col>
              <Col>
                <Row className="row-cols-auto">
                  {urlDownload && (
                    <ButtonDownload
                      buttonLabel="Exportar"
                      buttonIcon={<FaFileCsv />}
                      idPermission="export_parameters"
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
                  <th>Parametro</th>
                  {(hasPermissionSeeParameters ||
                    hasPermissionEditParameters) &&
                    parameters &&
                    parameters.length > 0 && <th></th>}
                </tr>
              </thead>
              <tbody>
                {parameters &&
                  parameters.map((p) => (
                    <tr key={p.id_definicion_m}>
                      <td>
                        {hasPermissionSeeParameters ? (
                          <Link
                            href={`/settings/parameters/details/${p.id_definicion_m}`}
                          >
                            <a>{p.de_definicion_m}</a>
                          </Link>
                        ) : (
                          p.de_definicion_m
                        )}
                      </td>
                      {(hasPermissionSeeParameters ||
                        hasPermissionEditParameters) && (
                        <td className="text-center text-nowrap">
                          {hasPermissionSeeParameters && (
                            <Link
                              href={`/settings/parameters/details/${p.id_definicion_m}`}
                            >
                              <a className="mx-1">
                                <FaFolderOpen />
                              </a>
                            </Link>
                          )}
                          {hasPermissionEditParameters && (
                            <Link
                              href={`/settings/parameters/edit/${p.id_definicion_m}`}
                            >
                              <a className="mx-1">
                                <FaRegEdit />
                              </a>
                            </Link>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          {!parameters && <SpinnerCustom />}
          {parameters && !parameters.length && (
            <Alert variant="warning">
              <FaBan className="me-1" />
              No hay parametros para mostrar
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}
