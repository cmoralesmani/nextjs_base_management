// src/components/accounts/UserAddEdit.jsx

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  FaRegEye,
  FaEraser,
  FaRegEyeSlash,
  FaUser,
  FaRegFileAlt,
  FaListAlt,
} from "react-icons/fa";
import * as Yup from "yup";

import { SpinnerCustom, ResetCancelSave } from "src/components/elements";
import { FormAddEditLayout } from "src/layouts";
import { useHasPermissionStatus } from "src/hooks/auth";
import { userService, profileService, toastService } from "src/services";

import { selectUserState } from "src/redux/slices/user-slice";
import { useSelector } from "react-redux";

export { UserAddEdit };

function UserAddEdit(props) {
  const user = props?.user;
  const isAddMode = !user;
  const router = useRouter();
  const userState = useSelector(selectUserState);

  const hasPermissionSeeUser = !isAddMode
    ? useHasPermissionStatus({
        codenamePermission: "see_single_user",
      })
    : undefined;
  const hasPermissionEditUser = !isAddMode
    ? useHasPermissionStatus({
        codenamePermission: "alter_user",
      })
    : undefined;

  const [profiles, setProfiles] = useState([]);
  const [statusFetchProfiles, setstatusFetchProfiles] = useState("waiting");
  const [validated, setValidated] = useState(false);
  // Estados para mostrar u ocultar la contrasena
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const hasPermissionListUsers = useHasPermissionStatus({
    codenamePermission: "see_users",
  });

  useEffect(() => {
    // Lista de los perfiles
    let isMounted = true;
    profileService
      .getProfiles({ active: "S" })
      .then((response) => {
        if (isMounted) {
          setstatusFetchProfiles("ready");
          setProfiles(response);
          if (!isAddMode) {
            setValue(
              "profiles_seleccionados",
              formOptions.defaultValues.profiles_seleccionados,
              { shouldValidate: true }
            );
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          setstatusFetchProfiles("error");
          setProfiles([]);
          toastService.warn(err.message);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Reglas de validacion para el formulario
  const validationSchema = Yup.object().shape({
    username: isAddMode
      ? Yup.string().required("El nombre de usuario es requerido")
      : null,
    name_user: Yup.string().required("El nombre es requerido"),
    lastname_user: Yup.string().required("El apellido es requerido"),
    gender_user_id: Yup.string()
      .oneOf(["SEX-M", "SEX-F"], "El sexo es requerido")
      .required("El sexo es requerido"),
    chk_status_user_id: Yup.boolean().required("El estado es requerido"),
    password: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .concat(
        isAddMode ? Yup.string().required("La contraseña es requerida") : null
      )
      .min(5, "La contraseña debe ser mayor de 5 caracteres"),
    password2: Yup.string()
      .concat(
        isAddMode ? Yup.string().required("La contraseña es requerida") : null
      )
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
    email: Yup.string()
      .email("El correo no es válido.")
      .required("El Correo electronico es requerido."),
    phone_contact: Yup.string().required("El número telefónico es requerido."),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // Establecer valores de formulario predeterminados si está en modo de edición
  if (!isAddMode) {
    user.chk_status_user_id =
      user.status_user_id == "ESCUS-ACTIV"
        ? true
        : user.status_user_id == "ESCUS-INACT"
        ? false
        : undefined;
    user.profiles_seleccionados = (user.profiles || []).map((u) => u.id_perfil);
    user.empresas_seleccionadas = (user.empresas || []).map(
      (b) => b.id_empresa
    );
    formOptions.defaultValues = user;
  } else {
    formOptions.defaultValues = {
      chk_status_user_id: true,
    };
  }

  // Obtiene las funciones para construir el formulario con el hook useForm()
  const { register, handleSubmit, reset, formState, setValue, setError } =
    useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    data.status_user_id = data.chk_status_user_id
      ? "ESCUS-ACTIV"
      : "ESCUS-INACT";
    return isAddMode ? createUser(data) : updateUser(user.id_user, data);
  }

  function createUser(data) {
    return userService
      .register(data)
      .then(() => {
        setValidated(true);
        toastService.success(`Usuario registrado`, {
          keepAfterRouteChange: true,
        });
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
        toastService.error(err.message, { keepAfterRouteChange: true });
      });
  }

  function updateUser(id_user, data) {
    return userService
      .update(id_user, data)
      .then(() => {
        toastService.success(
          `El usuario "${data.username}" ha sido actualizado`,
          { keepAfterRouteChange: true }
        );
        if (hasPermissionSeeUser)
          router.push(`/accessibility/accounts/details/${id_user}`);
        else if (hasPermissionListUsers) router.push("/accessibility/accounts");
        else router.push("/");
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
        toastService.error(err.message, { keepAfterRouteChange: true });
      });
  }

  const handleShowHide = () => {
    if (showPassword === false) {
      setShowPassword(true);
    } else if (showPassword === true) {
      setShowPassword(false);
    }
  };
  const handleShowHideCP = () => {
    if (showCPassword === false) {
      setShowCPassword(true);
    } else if (showCPassword === true) {
      setShowCPassword(false);
    }
  };

  function getTitleForm(isAddMode, username) {
    if (isAddMode) return "Datos del usuario";
    else return username;
  }

  function getIconTitleForm() {
    return <FaUser />;
  }

  function allowSelfUser(setPermissions) {
    /*
    Callback que recibe la funcion que modifica el permiso
    y se establece en verdadero si el usuario que esta intentando
    editar es el mismo que esta autenticado 
    */
    if (user.id_user === userState?.id_user) {
      setPermissions((permissions) => {
        return (permissions || []).map((p) => {
          p.has_permission = true;
          return p;
        });
      });
    }
  }

  const itemsTopRightComponents = [];
  if (hasPermissionListUsers) {
    itemsTopRightComponents.push(
      <Link key="listUser" href={`/accessibility/accounts`}>
        <a className="btn btn-link" title="Lista de usuarios">
          <FaListAlt />
        </a>
      </Link>
    );
  }
  if (!isAddMode && hasPermissionSeeUser) {
    itemsTopRightComponents.push(
      <Link
        key="detailsUser"
        href={`/accessibility/accounts/details/${user?.id_user}`}
      >
        <a className="btn btn-link" title="Detalle del usuario">
          <FaRegFileAlt />
        </a>
      </Link>
    );
  }

  return (
    <FormAddEditLayout
      title={getTitleForm(isAddMode, user?.username)}
      iconTitle={getIconTitleForm()}
      itemsTopRightComponents={itemsTopRightComponents}
    >
      <Form validated={validated} onSubmit={handleSubmit(onSubmit)}>
        {isAddMode && (
          <>
            <Form.Group as={Col} controlId="username">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de usuario"
                {...register("username")}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Contraseña"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
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
              {!isAddMode && (
                <Form.Text id="passwordHelpBlock" muted>
                  Déjelo en blanco para mantener la misma contraseña
                </Form.Text>
              )}
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password2">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Contraseña"
                  type={showCPassword ? "text" : "password"}
                  {...register("password2")}
                  isInvalid={!!errors.password2}
                />
                <Button
                  variant="outline-secondary"
                  id="button-addon2"
                  onClick={handleShowHideCP}
                  size="sm"
                >
                  {showCPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </Button>
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {errors.password2?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </>
        )}
        <Row className="mb-3">
          <Form.Group as={Col} lg="6" controlId="name_user">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              {...register("name_user")}
              isInvalid={!!errors.name_user}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name_user?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} lg="6" controlId="lastname_user">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido"
              {...register("lastname_user")}
              isInvalid={!!errors.lastname_user}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastname_user?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="gender_user_id">
            <Form.Label>Sexo</Form.Label>
            <Form.Control
              as="select"
              className="form-select"
              {...register("gender_user_id")}
              isInvalid={!!errors.gender_user_id}
            >
              <option>Elegir...</option>
              <option value="SEX-M">Masculino</option>
              <option value="SEX-F">Femenino</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.gender_user_id?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" as={Col} controlId="phone_contact">
            <Form.Label>Número Telefónico:</Form.Label>
            <Form.Control
              type="text"
              placeholder="+50388888888"
              {...register("phone_contact")}
              isInvalid={!!errors.phone_contact}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone_contact?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3" controlId="email">
            <Form.Label>Correo:</Form.Label>
            <Form.Control
              type="email"
              placeholder="correo@dominio.com"
              {...register("email")}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="chk_status_user_id">
            <Form.Check
              {...register("chk_status_user_id")}
              label="Activo"
              disabled={!isAddMode && !hasPermissionEditUser}
            />
            <Form.Control.Feedback type="invalid">
              {errors.chk_status_user_id?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {statusFetchProfiles == "waiting" ? (
          <SpinnerCustom />
        ) : (
          statusFetchProfiles == "ready" && (
            <Row className="mb-3">
              {/* https://stackoverflow.com/a/65327922 */}
              <Form.Group as={Col} controlId="profiles">
                <Row>
                  <Col>
                    <Button
                      variant="link"
                      className="float-end"
                      onClick={() => {
                        setValue("profiles_seleccionados", []);
                      }}
                      size="sm"
                      disabled={!isAddMode && !hasPermissionEditUser}
                    >
                      <FaEraser />
                    </Button>
                    <h4>Perfiles</h4>
                  </Col>
                </Row>
                <Form.Control
                  as="select"
                  multiple
                  className="form-select"
                  {...register("profiles_seleccionados")}
                  isInvalid={!!errors.profiles_seleccionados}
                  disabled={!isAddMode && !hasPermissionEditUser}
                >
                  {profiles.map((n) => (
                    <option key={n.id_perfil} value={n.id_perfil}>
                      {n.de_perfil}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>
          )
        )}
        <Row>
          <Col>
            <ResetCancelSave
              handleReset={() => reset(formOptions.defaultValues)}
              handleCancel={() => router.back()}
              isSubmitting={
                formState.isSubmitting || statusFetchProfiles == "waiting"
              }
              Title="Guardar"
            />
          </Col>
        </Row>
      </Form>
    </FormAddEditLayout>
  );
}
