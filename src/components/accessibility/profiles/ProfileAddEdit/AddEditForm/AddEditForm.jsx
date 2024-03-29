import { useRouter } from 'next/router'
import React from 'react'
import { Row, Form, Col } from 'react-bootstrap'

import { ResetCancelSave } from 'src/components/keypads'

import * as fields from './fields'

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
        <fields.IdField
          id="id_profile"
          plaintext={!isAddMode}
          readOnly={!isAddMode}
        />
        <fields.NameField id="de_profile" />
      </Row>
      <Row>
        <fields.StatusField id="status_profile_id" />
      </Row>
      <Row>
        <fields.UsersField
          id="users_selected"
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
          />
        </Col>
      </Row>
    </Form>
  )
}
