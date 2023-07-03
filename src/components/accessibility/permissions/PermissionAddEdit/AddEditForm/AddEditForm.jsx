import { useRouter } from "next/router";
import React from "react";
import { Row, Form, Col } from "react-bootstrap";

import { ResetCancelSave } from "src/components/keypads";

import * as fields from "./fields";

export function AddEditForm({
  isAddMode,
  values,
  handleChange,
  handleSubmit,
  handleBlur,
  touched,
  isSubmitting,
  errors,
  resetForm,
}) {
  const router = useRouter();

  const handleReset = () => {
    if (
      window.confirm("Está seguro de reestablecer los datos del formulario?")
    ) {
      resetForm();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <fields.IdField
          id="id_permission"
          plaintext={!isAddMode}
          readOnly={!isAddMode}
        />
        <fields.NameField id="de_permission" />
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
  );
}
