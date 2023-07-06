import { useField } from 'formik'
import { Col, Form } from 'react-bootstrap'

export function BooleanField ({
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
      <Form.Check
        label={label}
        isInvalid={isInvalid}
        checked={field.value}
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
