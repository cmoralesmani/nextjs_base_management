// app/components/templates/Parameters/ParametersAddEdit.jsx

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Alert,
  Badge,
  Container,
  Col,
  Form,
  Row,
  ListGroup,
} from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import { FaListAlt, FaRegFileAlt } from "react-icons/fa";
import * as Yup from "yup";

import { ResetCancelSave } from "@app/components/elements";
import { FormAddEditLayout } from "@app/components/layouts";
import { hasPermission } from "@app/helpers/utils";
import { useHasPermissionStatus } from "@app/hooks/useHasPermissionStatus";
import { parametersService, toastService } from "@app/services";

export function ParametersAddEdit(props) {
  const parameter = props?.parameter?.parametro;
  const id_parameter = parameter?.id_definicion_m;
  const isAddMode = !parameter;
  const router = useRouter();

  const [validated, setValidated] = useState(false);
  const permissions = useHasPermissionStatus(["PARAM-LISTA", "PARAM-VER"]);
  const hasPermissionListParameters = hasPermission(permissions, "PARAM-LISTA");
  const hasPermissionSeeParameters = hasPermission(permissions, "PARAM-VER");

  // Reglas de validacion para el formulario
  const validationSchema = Yup.object().shape({
    id_definicion_m: Yup.string().required("El ID es requerido"),
    de_definicion_m: Yup.string().required("La descripción es requerida"),
    obj_definicion_d: Yup.array().of(
      Yup.object().shape({
        id_definicion_d: Yup.string().required(
          "El ID de la opcion es requerida"
        ),
        descripcion_definicion_d: Yup.string()
          .max(255, "La descripción de la opción es requerida")
          .required("La descripción de la opcion es requerida"),
      })
    ),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  if (!isAddMode) {
    const defaultValues = {
      ...parameter,
    };
    formOptions.defaultValues = defaultValues;
  } else {
    formOptions.defaultValues = {};
  }

  // Obtiene las funciones para construir el formulario con el hook useForm()
  const { register, handleSubmit, reset, formState, setError, control } =
    useForm(formOptions);
  const { errors } = formState;
  const { fields } = useFieldArray({
    name: "obj_definicion_d",
    control,
  });

  function onSubmit(data) {
    return isAddMode
      ? createParameter(data)
      : updateParameter(id_parameter, data);
  }

  function createParameter(data) {
    setValidated(true);
    router.push(".");
    return null;
  }

  function updateParameter(id_parameter, data) {
    return parametersService
      .updateParameters(id_parameter, data)
      .then(() => {
        toastService.success(
          `El parametro "${data.de_definicion_m}" ha sido actualizada`,
          { keepAfterRouteChange: true }
        );
        router.push("..");
      })
      .catch((err) => {
        setValidated(false);
        /* 
                Se establecen los errores en los campos
                devueltos por el api.
                */
        err.errors?.map((e) => {
          setError(e?.param, {
            type: "manual",
            message: e?.msg,
          });
        });
        toastService.error(err.message);
      });
  }

  const itemsTopRightComponents = [];
  if (hasPermissionListParameters) {
    itemsTopRightComponents.push(
      <Link key="listParameters" href={`/settings/parameters`}>
        <a className="btn btn-link" title="Lista de parametros">
          <FaListAlt />
        </a>
      </Link>
    );
  }
  if (!isAddMode && hasPermissionSeeParameters) {
    itemsTopRightComponents.push(
      <Link
        key="detailsParameters"
        href={`/settings/parameters/details/${parameter?.id_definicion_m}`}
      >
        <a className="btn btn-link" title="Detalle del parametro">
          <FaRegFileAlt />
        </a>
      </Link>
    );
  }

  return (
    <FormAddEditLayout
      title="Datos del parametro"
      itemsTopRightComponents={itemsTopRightComponents}
    >
      <Form validated={validated} onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Form.Group as={Col} lg="6" controlId="id_empresa">
            <Form.Label>ID</Form.Label>
            {isAddMode ? (
              <Form.Control
                placeholder="ID"
                {...register("id_definicion_m")}
                isInvalid={!!errors.id_definicion_m}
              />
            ) : (
              <Form.Control
                plaintext
                readOnly
                placeholder="ID"
                {...register("id_definicion_m")}
                isInvalid={!!errors.id_definicion_m}
              />
            )}
            <Form.Control.Feedback type="invalid">
              {errors.id_definicion_m?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} lg="6" controlId="de_empresa">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción"
              {...register("de_definicion_m")}
              isInvalid={!!errors.de_definicion_m}
            />
            <Form.Control.Feedback type="invalid">
              {errors.de_definicion_m?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col>
            <h4>
              Opciones
              <Badge className="ms-2" bg="light" text="dark">
                {(fields || []).length}
              </Badge>
            </h4>
            {!fields?.length ? (
              <Alert variant="warning">No tiene opciones</Alert>
            ) : (
              <ListGroup as="ol" numbered>
                {fields.map((item, index) => (
                  <ListGroup.Item
                    key={item.id}
                    as="li"
                    className="d-flex align-items-start"
                    variant="secondary"
                  >
                    <Container className="ms-2 g-0">
                      <div className="fw-bold">
                        {item.comentario_definicion_d}
                      </div>
                      <Form.Group>
                        <Form.Control
                          {...register(
                            `obj_definicion_d.${index}.descripcion_definicion_d`
                          )}
                          isInvalid={
                            errors.obj_definicion_d
                              ? !!errors?.obj_definicion_d[index]
                                  ?.descripcion_definicion_d
                              : false
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.obj_definicion_d
                            ? errors.obj_definicion_d[index]
                                ?.descripcion_definicion_d?.message
                            : null}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Container>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <ResetCancelSave
              handleReset={() => reset(formOptions.defaultValues)}
              handleCancel={() => router.back()}
              isSubmitting={formState.isSubmitting}
            />
          </Col>
        </Row>
      </Form>
    </FormAddEditLayout>
  );
}
