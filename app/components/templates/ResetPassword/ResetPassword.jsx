// app/components/templates/ResetPassword/ResetPassword.jsx

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import {
  FaLock,
  FaRegEye,
  FaRegEyeSlash,
  FaSave,
  FaTimesCircle,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { userService, toastService } from "@app/services";

export { ResetPassword };

function ResetPassword({ user }) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  // Estados para mostrar u ocultar la contrasena
  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // Reglas de validacion para el formulario
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().concat(
      user.id_usuario == userService.userValue.id_user
        ? Yup.string().required("La contraseña anterior es requerida")
        : null
    ),
    newPassword: Yup.string()
      .required("La contraseña es requerida")
      .min(5, "La contraseña debe ser mayor de 5 caracteres"),
    password2: Yup.string().oneOf(
      [Yup.ref("newPassword")],
      "Las contraseñas no coinciden"
    ),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // Estado del formulario
  const { register, formState, reset, handleSubmit, setError } =
    useForm(formOptions);
  const { errors } = formState;

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setValidated(false);
    reset();
    setShowPasswordOld(false);
    setShowPassword(false);
    setShowPassword2(false);
    setShow(true);
  };

  const handleShowHide = (btn) => {
    if (btn == "button-password-old") {
      setShowPasswordOld(!showPasswordOld);
    } else if (btn == "button-password") {
      setShowPassword(!showPassword);
    } else if (btn == "button-password2") {
      setShowPassword2(!showPassword2);
    }
  };

  const onSubmit = (data) => {
    const newData = {
      id_usuario: user.id_usuario,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    userService
      .changePassword(newData)
      .then(() => {
        toastService.success(
          `Se ha cambiado la contraseña al usuario "${user.username}"`,
          { keepAfterRouteChange: true }
        );
        setValidated(true);
        setShow(false);
        reset();
      })
      .catch((err) => {
        setValidated(false);
        setShow(true);
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
  };

  if (!user) return null;

  const username =
    user.id_usuario == userService.userValue.id_user
      ? `${user.username} (Mi usuario)`
      : `${user.username}`;

  return (
    <>
      <Container className="text-end g-0">
        <Row>
          <Col>
            <Button variant="secondary" onClick={handleShow} size="sm">
              <FaLock className="me-1" />
              Cambiar contraseña
            </Button>
          </Col>
        </Row>
      </Container>

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
            {user.id_usuario == userService.userValue.id_user && (
              <Badge className="ms-2" bg="info" size="lg">
                Mi usuario
              </Badge>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Nombre de usuario</Form.Label>
                  <Form.Control
                    plaintext
                    readOnly
                    placeholder="ID"
                    value={user.username}
                  />
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>
                {user.id_usuario == userService.userValue.id_user && (
                  <Form.Group className="mb-3" controlId="oldPassword">
                    <Form.Label>Contraseña anterior</Form.Label>
                    <InputGroup>
                      <Form.Control
                        placeholder="Contraseña"
                        type={showPasswordOld ? "text" : "password"}
                        {...register("oldPassword")}
                        isInvalid={!!errors.oldPassword}
                      />
                      <Button
                        variant="outline-secondary"
                        id="button-password-old"
                        onClick={() => handleShowHide("button-password-old")}
                        size="sm"
                      >
                        {showPasswordOld ? <FaRegEye /> : <FaRegEyeSlash />}
                      </Button>
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                      {errors.oldPassword?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Contraseña</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="Contraseña"
                      type={showPassword ? "text" : "password"}
                      {...register("newPassword")}
                      isInvalid={!!errors.newPassword}
                    />
                    <Button
                      variant="outline-secondary"
                      id="button-password"
                      onClick={() => handleShowHide("button-password")}
                      size="sm"
                    >
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </Button>
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    {errors.newPassword?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password2">
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="Contraseña"
                      type={showPassword2 ? "text" : "password"}
                      {...register("password2")}
                      isInvalid={!!errors.password2}
                    />
                    <Button
                      variant="outline-secondary"
                      id="button-password2"
                      onClick={() => handleShowHide("button-password2")}
                      size="sm"
                    >
                      {showPassword2 ? <FaRegEye /> : <FaRegEyeSlash />}
                    </Button>
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    {errors.password2?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="text-end">
                <Button
                  className="me-1"
                  variant="primary"
                  type="submit"
                  disabled={formState.isSubmitting}
                  size="sm"
                >
                  {formState.isSubmitting ? (
                    <span className="spinner-border spinner-border-sm me-1"></span>
                  ) : (
                    <FaSave className="me-1" />
                  )}
                  Cambiar
                </Button>
                <Button
                  className="ms-1"
                  variant="secondary"
                  onClick={handleClose}
                  size="sm"
                >
                  <FaTimesCircle className="me-1" />
                  Cancelar
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
