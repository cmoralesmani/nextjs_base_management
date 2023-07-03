import { useField } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import { FaEraser } from "react-icons/fa";

import { Button } from "src/components/miscellaneous";

export function SelectField({
  id,
  label,
  text,
  wrapperAs = Col,
  optionsSource = [],
  ...rest
}) {
  const [field, meta, helpers] = useField(id);
  const isInvalid = !!meta.error;
  const { setValue } = helpers;

  // https://stackoverflow.com/a/65327922
  return (
    <Form.Group as={wrapperAs} className="mb-3" controlId={id}>
      <Row>
        <Col>
          <Button
            variant="link"
            className="float-end"
            onClick={() => setValue([])}
            size="sm"
            icon={<FaEraser />}
          />
          <h4>{label}</h4>
        </Col>
      </Row>
      <Form.Control
        as="select"
        htmlSize={7}
        multiple
        className="form-select"
        isInvalid={isInvalid}
        {...field}
        {...rest}
      >
        {optionsSource.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.description}
          </option>
        ))}
      </Form.Control>
      <Form.Control.Feedback type="invalid">
        {meta.error && meta.touched && meta.error}
      </Form.Control.Feedback>
      {!!text && <Form.Text muted>{text}</Form.Text>}
    </Form.Group>
  );
}
