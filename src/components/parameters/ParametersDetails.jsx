// src/components/parameters/ParametersDetails.jsx

import Link from "next/link";
import { Badge, Col, Container, Row, ListGroup } from "react-bootstrap";
import { FaBuilding, FaRegEdit, FaListAlt } from "react-icons/fa";

import { useHasPermissionStatus } from "src/hooks/auth";

export function ParametersDetails(props) {
  const parameter = props?.parameter?.parametro;

  const hasPermissionListParameters = useHasPermissionStatus({
    codenamePermission: "see_parameters",
  });
  const hasPermissionEditParameters = useHasPermissionStatus({
    codenamePermission: "alter_parameter",
  });

  if (!parameter) return null;

  return (
    <Container>
      <Row className="justify-content-center my-3">
        <Col lg={7} className="card">
          <Container className="my-3">
            <Row>
              <Col>
                {hasPermissionEditParameters && (
                  <Link
                    href={`/maintenance/parameters/edit/${parameter.id_definicion_m}`}
                    className="btn btn-link float-end"
                    title="Editar el parametro"
                  >
                    <FaRegEdit />
                  </Link>
                )}
                {hasPermissionListParameters && (
                  <Link
                    href={`/maintenance/parameters`}
                    className="btn btn-link float-end"
                    title="Lista de parametros"
                  >
                    <FaListAlt />
                  </Link>
                )}
                <h3>
                  <FaBuilding /> Detalle de parametro
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
                    {parameter.id_definicion_m}
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row as="dl">
                  <Col as="dt" xs={12}>
                    Nombre:
                  </Col>
                  <Col as="dd" xs={12}>
                    {parameter.de_definicion_m}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>
                  Opciones
                  <Badge className="ms-2" bg="light" text="dark">
                    {(parameter.obj_definicion_d || []).length}
                  </Badge>
                </h4>
                {!parameter.obj_definicion_d?.length ? (
                  <Alert variant="warning">No tiene opciones</Alert>
                ) : (
                  <ListGroup as="ol" numbered>
                    {parameter.obj_definicion_d.map((param) => {
                      return (
                        <ListGroup.Item
                          key={param.id_definicion_d}
                          as="li"
                          className="d-flex justify-content-between align-items-start"
                          variant="secondary"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">
                              {param.comentario_definicion_d}
                            </div>
                            {param.descripcion_definicion_d}
                          </div>
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
