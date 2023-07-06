import { Formik } from 'formik'
import { Badge, Modal } from 'react-bootstrap'
import { FaLock } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import { selectUserState } from 'src/redux/slices/user-slice'
import { userService, toastService } from 'src/services'
import { setErrorsReturnedByDjango } from 'src/utilities/forms'

import { ChangePasswordForm } from './ChangePasswordForm'
import initialValues from './InitialValues'
import validationSchema from './ValidationSchema'

export function ChangePasswordModal ({ show, setShow, user }) {
  const userState = useSelector(selectUserState)

  const handleSubmitChangePassword = (values, formikHelpers) => {
    const { resetForm, setFieldError } = formikHelpers
    return userService
      .changePassword(user.id_user, values)
      .then(() => {
        toastService.success(
          `Se ha cambiado la contraseña al usuario "${user.username}"`,
          { keepAfterRouteChange: true }
        )
        setShow(false)
        resetForm()
      })
      .catch((errors) => {
        /* Se establecen los errores en los campos devueltos por el api. */
        setErrorsReturnedByDjango(errors.errors, setFieldError)
      })
  }

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
    >
      <Modal.Header>
        <Modal.Title>
          <FaLock className="me-1" />
          Cambio de Contraseña
          {user.id_user === userState?.id_user && (
            <Badge className="ms-2" bg="info" size="lg">
              Mi usuario
            </Badge>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues(user)}
          validationSchema={validationSchema(user, userState)}
          onSubmit={async (values, formikHelpers) => {
            await handleSubmitChangePassword(values, formikHelpers)
          }}
          // https://stackoverflow.com/a/72990794
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => {
            return (
              <ChangePasswordForm user={user} setShow={setShow} {...props} />
            )
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}
