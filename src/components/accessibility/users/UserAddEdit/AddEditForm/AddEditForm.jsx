import { useRouter } from 'next/router'
import React from 'react'
import { Row, Form, Col } from 'react-bootstrap'

import * as fields from './fields'
import { ResetCancelSave } from 'src/components/keypads'

export function AddEditForm ({
  isAddMode,
  controllerRequestAPI,
  values,
  handleChange,
  handleSubmit,
  handleBlur,
  touched,
  isSubmitting,
  errors,
  resetForm
}) {
  const router = useRouter()

  const handleReset = () => {
    if (
      window.confirm('Está seguro de reestablecer los datos del formulario?')
    ) {
      resetForm()
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <fields.UsernameField
          id="username"
          plaintext={!isAddMode}
          readOnly={!isAddMode}
        />
      </Row>
      {isAddMode && (
        <>
          <Row>
            <fields.PasswordField id="password" />
          </Row>
          <Row>
            <fields.PasswordField
              id="password2"
              label="Confirmar Contraseña"
              placeholder="Contraseña"
            />
          </Row>
        </>
      )}
      <Row>
        <fields.NameField id="name_user" />
        <fields.LastNameField id="lastname_user" />
      </Row>
      <Row>
        <fields.EmailField id="email" />
      </Row>
      <Row>
        <fields.GenderField id="gender_user_id" />
        <fields.PhoneContactField id="phone_contact" />
      </Row>
      <Row>
        <fields.StatusField id="status_user_id" />
      </Row>
      <Row>
        <fields.ProfilesField
          id="profiles_selected"
          controllerRequestAPI={controllerRequestAPI}
        />
      </Row>
      <Row>
        <fields.PermissionsField
          id="permissions_selected"
          controllerRequestAPI={controllerRequestAPI}
        />
      </Row>

      <Row>
        <Col>
          <ResetCancelSave
            handleReset={handleReset}
            handleCancel={() => router.back()}
            isSubmitting={isSubmitting}
            Title="Guardar"
          />
        </Col>
      </Row>
    </Form>
  )
}
