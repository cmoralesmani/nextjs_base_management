import { Col, Form } from 'react-bootstrap'
import { useField } from 'formik'

export function PlainTextField ({
  id,
  label,
  placeholder,
  text,
  wrapperAs = Col,
  ...rest
}) {
  const [field, meta] = useField(id)
  const isInvalid = !!meta.error

  return (
    <Form.Group as={wrapperAs} className="mb-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        placeholder={placeholder}
        isInvalid={isInvalid}
        plaintext
        readOnly
        {...field}
        {...rest}
      />
      <Form.Control.Feedback type="invalid">
        {meta.error && meta.touched && meta.error}
      </Form.Control.Feedback>
      {!!text && <Form.Text muted>{text}</Form.Text>}
    </Form.Group>
  )
}
