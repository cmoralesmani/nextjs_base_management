import { Alert, Badge, Col, ListGroup, Row } from 'react-bootstrap'

export function Options ({ options }) {
  return (
    <Row>
      <Col>
        <h4>
          Opciones
          <Badge className="ms-2" bg="light" text="dark">
            {(options || []).length}
          </Badge>
        </h4>
        {!options?.length
          ? (
          <Alert variant="warning">No tiene opciones</Alert>
            )
          : (
          <ListGroup as="ol" numbered>
            {options.map((option) => {
              return (
                <ListGroup.Item
                  key={option.id_definicion_d}
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                  variant="secondary"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">
                      {option.comentario_definicion_d}
                    </div>
                    {option.descripcion_definicion_d}
                  </div>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
            )}
      </Col>
    </Row>
  )
}
