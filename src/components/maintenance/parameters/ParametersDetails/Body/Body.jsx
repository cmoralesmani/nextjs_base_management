import { Col, Row } from "react-bootstrap";

import * as sections from "./sections";

export function Body({ parameter }) {
  return (
    <>
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
      <sections.Options options={parameter.obj_definicion_d} />
    </>
  );
}
