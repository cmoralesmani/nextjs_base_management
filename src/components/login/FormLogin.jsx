// src/components/login/FormLogin.jsx

import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash, FaSignInAlt } from "react-icons/fa";

export function FormLogin({
  values,
  handleChange,
  handleSubmit,
  handleBlur,
  touched,
  isSubmitting,
  errors,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowHide = () => setShowPassword((prevState) => !prevState);

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-1">
        <Form.Group as={Col} controlId="username">
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Ingresar nombre de usuario"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username && touched.username && errors.username}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-1">
        <Form.Group controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <InputGroup>
            <Form.Control
              placeholder="Contraseña"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.password}
            />
            <Button
              variant="outline-secondary"
              id="button-addon1"
              onClick={handleShowHide}
              size="sm"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </Button>
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            {errors.password && touched.password && errors.password}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="keepSessionActive">
          <Form.Check
            name="keepSessionActive"
            type="checkbox"
            checked={values.keepSessionActive}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Mantener la sesión activada"
          />
          <Form.Control.Feedback type="invalid">
            {errors.keepSessionActive?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <div className="text-center mt-3 mb-3">
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="spinner-border spinner-border-sm me-1"></span>
          ) : (
            <FaSignInAlt className="me-1" />
          )}
          Ingresar
        </Button>
      </div>
    </Form>
  );
}
