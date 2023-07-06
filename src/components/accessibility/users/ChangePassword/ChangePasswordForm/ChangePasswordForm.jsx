import { Col, Form, Row } from 'react-bootstrap'
import { FaSave, FaTimesCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import { Button } from 'src/components/miscellaneous'
import { selectUserState } from 'src/redux/slices/user-slice'

import * as fields from './fields'

export function ChangePasswordForm ({
  user,
  setShow,
  values,
  handleChange,
  handleSubmit,
  handleBlur,
  touched,
  isSubmitting,
  errors,
  resetForm
}) {
  const userState = useSelector(selectUserState)

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <fields.UsernameField id="username" />
      </Row>
      {user.id_user === userState?.id_user && (
        <Row>
          <fields.PasswordField id="oldPassword" label="Contraseña anterior" />
        </Row>
      )}
      <Row>
        <fields.PasswordField id="newPassword" />
      </Row>
      <Row>
        <fields.PasswordField id="password2" label="Confirmar Contraseña" />
      </Row>
      <Row>
        <Col className="text-end">
          <Button
            className="me-1"
            type="submit"
            isSubmitting={isSubmitting}
            size="sm"
            icon={<FaSave className="me-1" />}
          >
            Cambiar
          </Button>
          <Button
            className="ms-1"
            variant="secondary"
            onClick={() => setShow(false)}
            size="sm"
            icon={<FaTimesCircle className="me-1" />}
          >
            Cancelar
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
