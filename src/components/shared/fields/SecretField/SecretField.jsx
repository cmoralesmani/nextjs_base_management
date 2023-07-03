import { Col, Form, InputGroup } from "react-bootstrap";
import { useField } from "formik";
import { Button } from "src/components/miscellaneous";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

export function SecretField({
  id,
  label,
  placeholder,
  text,
  wrapperAs = Col,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(id);
  const isInvalid = !!meta.error;

  const handleShowHide = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <Form.Group as={wrapperAs} className="mb-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <InputGroup hasValidation>
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          isInvalid={isInvalid}
          {...field}
          {...rest}
        />
        <Button
          variant="outline-secondary"
          onClick={handleShowHide}
          size="sm"
          icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
        />
        <Form.Control.Feedback type="invalid">
          {meta.error && meta.touched && meta.error}
        </Form.Control.Feedback>
      </InputGroup>
      {!!text && <Form.Text muted>{text}</Form.Text>}
    </Form.Group>
  );
}
