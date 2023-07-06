import { Formik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Container, Col, Row, Card } from 'react-bootstrap'

import { FormLogin } from 'src/components/login'
import { authService } from 'src/services'
import { setErrorsReturnedByDjango } from 'src/utilities/forms'

import initialValues from './InitialValues'
import validationSchema from './ValidationSchema'

import logo from 'public/assets/images/logo.svg'

const { authSubject } = authService

export function Login () {
  const router = useRouter()

  useEffect(() => {
    if (authSubject.value) {
      router.push('/')
    }
  }, [])

  const handleSubmitLogin = (values, formikHelpers) => {
    const { setSubmitting, setFieldError } = formikHelpers
    const { username, password, keepSessionActive } = values

    return authService
      .login(username, password, keepSessionActive)
      .then(() => {
        // Se obtiene la URL de retorno de los parámetros de query o por defecto a '/'
        const returnUrl = router.query.returnUrl || '/'
        router.push(returnUrl)
      })
      .catch((errors) => {
        console.log(errors)
        /* Se establecen los errores en los campos devueltos por el api. */
        setErrorsReturnedByDjango(errors.errors, setFieldError)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <Container className="mt-5 mb-4">
      <Row className="justify-content-center">
        <Col xl={5} lg={6} md={8} className="card mt-5 rounded shadow-sm">
          <Container className="text-center mt-3">
            <Image
              src={logo}
              alt="Logo"
              priority={true}
              height={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
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
              initialValues={initialValues()}
              validationSchema={validationSchema()}
              onSubmit={async (values, formikHelpers) => {
                await handleSubmitLogin(values, formikHelpers)
              }}
              validateOnChange={false}
              validateOnBlur={false}
              component={FormLogin}
            />
          </Card.Body>
        </Col>
      </Row>
    </Container>
  )
}
