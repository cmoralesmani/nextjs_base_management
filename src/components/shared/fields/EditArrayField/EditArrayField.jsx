import { Field, FieldArray, useField } from "formik";
import { Col, Container, Form, ListGroup } from "react-bootstrap";

export function EditArrayField({
  id,
  label,
  text,
  wrapperAs = Col,
  columnNameId,
  columnNameLabel,
  columnNameInput,
  ...rest
}) {
  const [field, meta] = useField(id);
  const { value } = field;

  // https://code.pieces.app/blog/react-form-validation-formik-yup
  return (
    <>
      <FieldArray
        name={id}
        render={(arrayHelpers) => (
          <ListGroup as="ol" numbered className="mb-3">
            {value.map((val, index) => (
              <ListGroup.Item
                key={val[columnNameId]}
                as="li"
                className="d-flex align-items-start"
                variant="secondary"
              >
                <Container className="ms-2 g-0">
                  <div className="fw-bold">{val[columnNameLabel]}</div>
                  <Form.Group>
                    <Field name={`${id}.${index}.${columnNameInput}`}>
                      {({
                        field, //{ name, value, onChange, onBlur }
                        form, // { touched, errors }
                        meta,
                      }) => {
                        return (
                          <>
                            <Form.Control {...field} />
                            {meta.touched && meta.error && (
                              <small className="error">{meta.error}</small>
                            )}
                          </>
                        );
                      }}
                    </Field>
                  </Form.Group>
                </Container>
              </ListGroup.Item>
            ))}
            <Form.Control.Feedback type="invalid">
              {meta.error && meta.touched && meta.error}
            </Form.Control.Feedback>
            {!!text && <Form.Text muted>{"text"}</Form.Text>}
          </ListGroup>
        )}
      />
    </>
  );
}
