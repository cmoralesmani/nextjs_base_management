import { useRouter } from 'next/router'
import React from 'react'
import { Row, Form, Col } from 'react-bootstrap'
import * as fields from './fields'

import { ResetCancelSave } from 'src/components/keypads'

export function AddEditForm ({
  isAddMode,
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
          id="id_definicion_m"
          plaintext={!isAddMode}
          readOnly={!isAddMode}
        />
        <fields.DescriptionField id="de_definicion_m" />
      </Row>
      <Row>
        <fields.OptionsField id="obj_definicion_d" />
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
