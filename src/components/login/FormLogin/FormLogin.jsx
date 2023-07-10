import React from 'react'
import { Row, Form } from 'react-bootstrap'
import { FaSignInAlt } from 'react-icons/fa'

import { Button } from 'src/components/miscellaneous'

import * as fields from './fields'

export function FormLogin ({
  values,
  handleChange,
  handleSubmit,
  handleBlur,
  touched,
  isSubmitting,
  errors
}) {
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <fields.UsernameField id="username" />
      </Row>
      <Row>
        <fields.PasswordField id="password" />
      </Row>
      <Row>
        <fields.KeepSessionActiveField id="keepSessionActive" />
      </Row>
      <div className="text-center mt-3 mb-3">
        <Button
          variant="primary"
          type="submit"
          name="login"
          isSubmitting={isSubmitting}
          icon={<FaSignInAlt />}
        >
          Ingresar
        </Button>
      </div>
    </Form>
  )
}
