import Link from "next/link";
import PropTypes from "prop-types";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FaFile, FaRegFileAlt } from "react-icons/fa";

export { FormAddEditLayout };

FormAddEditLayout.propTypes = {
  title: PropTypes.string.isRequired,
  iconTitle: PropTypes.element,
  urlShow: PropTypes.string,
  itemsTopRightComponents: PropTypes.array,
};

FormAddEditLayout.defaultProps = {
  iconTitle: <FaFile />,
};

function FormAddEditLayout({
  children,
  title,
  iconTitle,
  urlShow,
  itemsTopRightComponents,
}) {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="7" className="card my-3">
          <Card.Body>
            {itemsTopRightComponents && (
              <div className="float-end">
                {itemsTopRightComponents.map((i) => i)}
              </div>
            )}
            {urlShow && (
              <Link href={`${urlShow}`} className="btn btn-link float-end p-0">
                <FaRegFileAlt />
              </Link>
            )}

            <Card.Title as="h3">
              <span className="me-1">{iconTitle}</span> {title}
            </Card.Title>
            <hr className="mb-3" />
            {children}
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
}
