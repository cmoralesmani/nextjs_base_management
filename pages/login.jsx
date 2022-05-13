// pages/login.jsx

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Form,
  Button,
  InputGroup,
  Container,
  Card,
  Row,
  Col,
  Navbar,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash, FaSignInAlt } from "react-icons/fa";
import * as Yup from "yup";

import { userService, toastService } from "@app/services";

import logo from "../assets/images/logo.svg";

export default function Login() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowHide = () => setShowPassword((prevState) => !prevState);

  useEffect(() => {
    // Redirgir al home si ya esta logeado
    if (userService.userValue) {
      router.push("/");
    }
  });

  // Reglas de validacion para el formulario
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("El Nombre de Usuario es requerido"),
    password: Yup.string().required("La Contraseña es requerida"),
    sessionActive: Yup.string().required(
      "El indicador Mantener la sesion activa es requerido"
    ),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ username, password, sessionActive }) {
    return userService
      .login(username, password, sessionActive)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl);
      })
      .catch((err) => {
        err.errors?.map((e) => {
          setError(e?.param, {
            type: "manual",
            message: e?.msg,
          });
        });
        toastService.error(err.message, { keepAfterRouteChange: true });
      });
  }

  const NavbarLogin = () => (
    <Navbar
      bg="primary"
      variant="dark"
      className="fixed-top navbar-expand-lg scrolling-navbar"
    >
      <Container>
        <Navbar.Brand>NEXT JS</Navbar.Brand>
      </Container>
    </Navbar>
  );

  const FormLogin = () => (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-1">
        <Form.Group as={Col} controlId="username">
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresar nombre de usuario"
            {...register("username")}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-1">
        <Form.Group controlId="password">
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
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="sessionActive">
          <Form.Check
            {...register("sessionActive")}
            label="Mantener la sesión activada"
          />
          <Form.Control.Feedback type="invalid">
            {errors.sessionActive?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <div className="text-center mt-3 mb-3">
        <Button
          variant="primary"
          type="submit"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? (
            <span className="spinner-border spinner-border-sm me-1"></span>
          ) : (
            <FaSignInAlt className="me-1" />
          )}
          Ingresar
        </Button>
      </div>
    </Form>
  );

  return (
    <>
      <NavbarLogin />
      <Container className="mt-5 mb-4">
        <Row className="justify-content-center">
          <Col xl={5} lg={6} md={8} className="card mt-5 rounded shadow-sm">
            <Container className="text-center mt-3">
              <Image src={logo} alt="" height={100} width={150} />
            </Container>
            <Card.Body className="py-0">
              <Card.Title className="text-center">
                Bienvenido al sistema hecho con Next JS
              </Card.Title>
              <Card.Text className="text-center">
                Ingrese sus credenciales para iniciar sesión.
              </Card.Text>
              <hr className="mb-3" />
              <FormLogin />
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </>
  );
}
