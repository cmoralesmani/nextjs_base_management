import Link from "next/link";
import PropTypes from "prop-types";
import { Alert, Badge, Col, ListGroup, Row } from "react-bootstrap";

export { ListSection };

ListSection.propTypes = {
  /**
   * Titulo de la sección
   */
  title: PropTypes.string.isRequired,
  /**
   * Lista de elementos
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      description: PropTypes.string.isRequired,
      link: PropTypes.shape({
        href: PropTypes.string.isRequired,
      }),
    })
  ),
};

ListSection.defaultProps = {
  textEmpty: "No hay registros para mostrar",
};

function ListSection({ title, items, textEmpty }) {
  return (
    <Row className="mt-3">
      <Col>
        <h4>
          {title}
          <Badge className="ms-2" bg="light" text="dark">
            {(items || []).length}
          </Badge>
        </h4>
        {!items?.length ? (
          <Alert variant="warning">{textEmpty}</Alert>
        ) : (
          <ListGroup as="ol" numbered>
            {items.map((item) => {
              const link = item?.link;
              if (!item.key)
                throw new Error(
                  `No ha especificado la key para el item ${JSON.stringify(
                    item
                  )}`
                );
              return (
                <ListGroup.Item key={item.key} as="li" variant="secondary">
                  {!!link ? (
                    <Link href={link.href}>{item.description}</Link>
                  ) : (
                    <>{item.description}</>
                  )}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
}
