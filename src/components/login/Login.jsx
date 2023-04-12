// src/components/login/Login.jsx

import { Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

import { authService, toastService } from "src/services";
import { utilitiesLogin } from "src/utilities";
import { FORM_LOGIN_EMPTY_VALUES } from "src/utilities/login/types.d";

import { FormLogin } from "./FormLogin";
import { NavbarLogin } from "./NavbarLogin";

const { authSubject } = authService;
const { formLoginSchema } = utilitiesLogin;

import logo from "public/assets/images/logo.svg";

export function Login() {
  const router = useRouter();

  useEffect(() => {
    if (authSubject.value) {
      router.push("/");
    }
  }, []);

  const handleSubmitLogin = (values, formikHelpers) => {
    const { setSubmitting, setFieldError } = formikHelpers;
    const { username, password, keepSessionActive } = values;

    return authService
      .login(username, password, keepSessionActive)
      .then(() => {
        // Se obtiene la URL de retorno de los parámetros de query o por defecto a '/'
        const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl);
      })
      .catch((err) => {
        const apiError = err?.detail;
        toastService.error(apiError, { keepAfterRouteChange: true });
        setFieldError("apiError", apiError);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

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
              <Formik
                initialValues={FORM_LOGIN_EMPTY_VALUES}
                validationSchema={formLoginSchema}
                onSubmit={async (values, formikHelpers) => {
                  await handleSubmitLogin(values, formikHelpers);
                }}
                component={FormLogin}
              ></Formik>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </>
  );
}
