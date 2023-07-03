import { useField } from "formik";
import { Col, Form } from "react-bootstrap";

export function SelectSingleField({
  id,
  label,
  text,
  wrapperAs = Col,
  optionsSource = [],
  ...rest
}) {
  const [field, meta, helpers] = useField(id);
  const isInvalid = !!meta.error;

  // https://stackoverflow.com/a/65327922
  return (
    <Form.Group as={wrapperAs} className="mb-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        className="form-select"
        isInvalid={isInvalid}
        {...field}
        {...rest}
      >
        <option>Elegir...</option>
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
