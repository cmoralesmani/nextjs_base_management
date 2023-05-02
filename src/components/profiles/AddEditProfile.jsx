// src/components/profiles/AddEditProfile.jsx

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Accordion,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import {
  FaEraser,
  FaRegCheckSquare,
  FaRegSquare,
  FaRegFileAlt,
  FaListAlt,
} from "react-icons/fa";
import * as Yup from "yup";

import { Button } from "src/components/miscellaneous";
import { SpinnerCustom, ResetCancelSave } from "src/components/elements";
import { FormAddEditLayout } from "src/layouts";
import { useHasPermissionStatus } from "src/hooks/auth";
import {
  userService,
  permissionService,
  profileService,
  toastService,
} from "src/services";

export { AddEditProfile };

function AddEditProfile(props) {
  const profile = props?.profile?.perfil;
  const isAddMode = !profile;
  const router = useRouter();

  const hasPermissionSeeProfile = useHasPermissionStatus({
    codenamePermission: "see_single_profile",
  });

  const hasPermissionListProfile = useHasPermissionStatus({
    codenamePermission: "see_profiles",
  });

  const [users, setUsers] = useState([]);
  const [statusFetchUsers, setStatusFetchUsers] = useState("waiting");
  const [permissions, setPermissions] = useState([]);
  const [statusFetchPermissions, setStatusFetchPermissions] =
    useState("waiting");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    // Lista de los usuarios
    let isMounted = true;
    userService
      .getUsers({})
      .then((x) => {
        if (isMounted) {
          setStatusFetchUsers("ready");
          setUsers(x);
          if (!isAddMode) {
            setValue(
              "usuarios_seleccionados",
              formOptions.defaultValues.usuarios_seleccionados,
              { shouldValidate: true }
            );
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          setStatusFetchUsers("error");
          setUsers([]);
          toastService.info(err.message);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // Lista de los permisos
    let isMounted = true;
    permissionService
      .getPermissions({})
      .then((x) => {
        if (isMounted) {
          setPermissions(x.permisos);
          formOptions.defaultValues.permisos_seleccionados =
            getPermissionsSelected(
              x.permisos,
              props?.profile?.perfil?.permisos
            );
          setValue(
            "permisos_seleccionados",
            formOptions.defaultValues.permisos_seleccionados,
            { shouldValidate: true }
          );
          setStatusFetchPermissions("ready");
        }
      })
      .catch((err) => {
        if (isMounted) {
          setPermissions([]);
          setStatusFetchPermissions("error");
          toastService.info(err.message);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Reglas de validacion para el formulario
  const validationSchema = Yup.object().shape({
    id_perfil: Yup.string().required("El ID es requerido"),
    de_perfil: Yup.string().required("El Nombre es requerido"),
    chk_es_perfil: Yup.boolean().required("El estado es requerido"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  function getPermissionsSelected(permissions, permissionsCurrent) {
    /**
     * Obtiene un objeto util para la lista de check
     * que tiene la vista donde su estructura es
     * {id, name, selected}
     * Recibe la lista de permisos total y cuales de esos
     * son los que ya tiene el perfil */
    //  isAddMode ? false : (props.profile.perfil?.permisos || []).map(p => p.id_permission).includes(p.id_permission)
    return (permissions || []).map((p) => {
      return {
        id: p.id_permission,
        name: `${p.de_permiso_grupo} (${p.de_permiso_accion})`,
        selected: !permissionsCurrent
          ? false
          : permissionsCurrent
              .map((p) => p.id_permission)
              .includes(p.id_permission),
      };
    });
  }

  const permissionsSelected = getPermissionsSelected(
    permissions,
    props?.profile?.perfil?.permisos
  );

  if (!isAddMode) {
    props.profile.perfil.chk_es_perfil =
      props.profile.perfil.es_perfil == "ESPER-ACTIV"
        ? true
        : props.profile.perfil.es_perfil == "ESPER-INACT"
        ? false
        : undefined;
    props.profile.perfil.usuarios_seleccionados =
      props.profile.perfil.usuarios.map((u) => u.id_user);
    props.profile.perfil.permisos_seleccionados = permissionsSelected;
    formOptions.defaultValues = props.profile.perfil;
  } else {
    formOptions.defaultValues = {
      chk_es_perfil: true,
      permisos_seleccionados: permissionsSelected,
    };
  }

  // Obtiene las funciones para construir el formulario con el hook useForm()
  const {
    register,
    handleSubmit,
    reset,
    formState,
    setValue,
    setError,
    control,
    watch,
  } = useForm(formOptions);
  const { errors } = formState;

  const { fields } = useFieldArray({
    control,
    name: "permisos_seleccionados",
  });
  const watchFieldArray = watch("permisos_seleccionados");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray,
    };
  });

  function onSubmit(data) {
    data.es_perfil = data.chk_es_perfil ? "ESPER-ACTIV" : "ESPER-INACT";
    data.permisos_seleccionados = (data?.permisos_seleccionados || [])
      .filter((p) => p.selected)
      .map((p) => p.id);
    return isAddMode
      ? createProfile(data)
      : updateProfile(profile.id_perfil, data);
  }

  function createProfile(data) {
    return profileService
      .createProfile(data)
      .then(() => {
        setValidated(true);
        toastService.success(`Perfil creado`, { keepAfterRouteChange: true });
        router.push(".");
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

  function updateProfile(id_profile, data) {
    return profileService
      .updateProfile(id_profile, data)
      .then(() => {
        toastService.success(
          `El perfil "${data.de_perfil}" ha sido actualizado`,
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
  if (hasPermissionListProfile) {
    itemsTopRightComponents.push(
      <Link
        key="listProfile"
        href={`/accessibility/profiles`}
        className="btn btn-link"
        title="Lista de perfiles"
      >
        <FaListAlt />
      </Link>
    );
  }
  if (!isAddMode && hasPermissionSeeProfile) {
    itemsTopRightComponents.push(
      <Link
        key="detailsProfile"
        href={`/accessibility/profiles/details/${profile?.id_perfil}`}
        className="btn btn-link"
        title="Detalle del perfil"
      >
        <FaRegFileAlt />
      </Link>
    );
  }

  return (
    <FormAddEditLayout
      title="Datos del perfil"
      itemsTopRightComponents={itemsTopRightComponents}
    >
      <Form validated={validated} onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Form.Group as={Col} lg="6" controlId="id_perfil">
            <Form.Label>ID</Form.Label>
            {isAddMode ? (
              <Form.Control
                type="text"
                placeholder="ID"
                {...register("id_perfil")}
                isInvalid={!!errors.id_perfil}
              />
            ) : (
              <Form.Control
                plaintext
                readOnly
                placeholder="ID"
                {...register("id_perfil")}
                isInvalid={!!errors.id_perfil}
              />
            )}

            <Form.Control.Feedback type="invalid">
              {errors.id_perfil?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} lg="6" controlId="de_perfil">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              {...register("de_perfil")}
              isInvalid={!!errors.de_perfil}
            />
            <Form.Control.Feedback type="invalid">
              {errors.de_perfil?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="chk_es_perfil">
            <Form.Check {...register("chk_es_perfil")} label="Activo" />
            <Form.Control.Feedback type="invalid">
              {errors.chk_es_perfil?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        {statusFetchUsers == "waiting" ? (
          <SpinnerCustom />
        ) : (
          statusFetchUsers == "ready" && (
            <Row className="mb-3">
              {/* https://stackoverflow.com/a/65327922 */}
              <Form.Group as={Col} controlId="usuarios">
                <Row>
                  <Col>
                    <Button
                      variant="link"
                      className="float-end"
                      onClick={() => {
                        setValue("usuarios_seleccionados", []);
                      }}
                      size="sm"
                      icon={<FaEraser />}
                    />
                    <h4>Usuarios</h4>
                  </Col>
                </Row>
                <Form.Control
                  as="select"
                  htmlSize={7}
                  multiple
                  className="form-select"
                  {...register("usuarios_seleccionados")}
                  isInvalid={!!errors.usuarios_seleccionados}
                >
                  {users.map((n) => (
                    <option key={n.id_user} value={n.id_user}>
                      {n.name_user} {n.lastname_user} ({n.username})
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>
          )
        )}
        {statusFetchPermissions == "waiting" ? (
          <SpinnerCustom />
        ) : (
          statusFetchPermissions == "ready" && (
            <Row className="mb-3">
              <Col>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <h4>Permisos</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Container className="g-0 mb-3 d-flex justify-content-end">
                        <ButtonGroup size="sm">
                          <Button
                            variant="secondary"
                            onClick={() => {
                              fields.map((x, index) => {
                                setValue(
                                  `permisos_seleccionados.${index}.selected`,
                                  true,
                                  { shouldValidate: true }
                                );
                              });
                            }}
                            icon={<FaRegCheckSquare className="me-1" />}
                          >
                            Todos
                          </Button>
                          <Button
                            variant="dark"
                            onClick={() => {
                              fields.map((x, index) => {
                                setValue(
                                  `permisos_seleccionados.${index}.selected`,
                                  false,
                                  { shouldValidate: true }
                                );
                              });
                            }}
                            icon={<FaRegSquare className="me-1" />}
                          >
                            Ninguno
                          </Button>
                        </ButtonGroup>
                      </Container>
                      {controlledFields.map((permission, index) => {
                        return (
                          <Form.Group
                            key={permission.id}
                            controlId={`permisos${index}`}
                          >
                            <Form.Check className="form-check" type="checkbox">
                              <Form.Check.Input
                                {...register(
                                  `permisos_seleccionados.${index}.selected`
                                )}
                                type="checkbox"
                              />
                              <Form.Check.Label>
                                {permission.name}
                              </Form.Check.Label>
                            </Form.Check>
                          </Form.Group>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
          )
        )}
        <Row>
          <Col>
            <ResetCancelSave
              handleReset={() => reset(formOptions.defaultValues)}
              handleCancel={() => router.back()}
              isSubmitting={
                formState.isSubmitting ||
                statusFetchUsers == "waiting" ||
                statusFetchPermissions == "waiting"
              }
            />
          </Col>
        </Row>
      </Form>
    </FormAddEditLayout>
  );
}
