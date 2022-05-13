// app/components/elements/SearchForm.jsx

import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  FormControl,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaTimes, FaSearch } from "react-icons/fa";

import { toastService } from "@app/services";

export { SearchForm };

SearchForm.propTypes = {
  updateCallback: PropTypes.func.isRequired,
  urlBaseDownload: PropTypes.string.isRequired,
  setUrlDownload: PropTypes.func.isRequired,
};

function SearchForm({ updateCallback, urlBaseDownload, setUrlDownload }) {
  /**
   * Ya que hay varias vista que comparten esta forma de consultar datos
   * se hizo este componente para reutilizarlo en los sitios donde
   * hay una lista que es filtrada por un unico campo Buscar...
   * updateCallback: Es una funcion que conoce la funcionalidad de
   *  actualizar sus datos para mostrarse en la tabla correspondiente
   * setUrlDownload: Es un metodo de useState() para actualizar la
   *  url dependiendo de la busqueda.
   */
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formOptions = {};

  // Establecer los valores por defecto del formulario
  const router = useRouter();
  const { query } = useRouter();
  const filters_q = query?.filters ? JSON.parse(query?.filters) : {};

  if (!formOptions.defaultValues) {
    formOptions.defaultValues = {};
    formOptions.defaultValues.search = getDefaultValueSearchForm(filters_q);
  }

  function getDefaultValueSearchForm(filters_q) {
    return filters_q?.search || "";
  }

  const { handleSubmit, register, setValue, getValues } = useForm(formOptions);

  useEffect(() => {
    executeCallback(formOptions.defaultValues);
  }, []);

  async function executeCallback(data) {
    // data son los datos del formulario tal y como los maneja el formulario
    const filters = data;

    const paramsUrlStr = `?filters=${encodeURIComponent(
      JSON.stringify(filters)
    )}`;
    // https://www.codegrepper.com/code-examples/javascript/react+change+url+without+reload
    if (window.history.replaceState) {
      //prevents browser from storing history with each change:
      window.history.replaceState(
        {
          ...window.history.state,
          as: `${window.location.pathname}${paramsUrlStr}`,
          url: `${window.location.pathname}${paramsUrlStr}`,
        },
        "",
        `${window.location.pathname}${paramsUrlStr}`
      );
    }

    setUrlDownload(`${urlBaseDownload}${paramsUrlStr}`);

    try {
      setIsSubmitting(true);
      await updateCallback(filters);
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      toastService.error(err.message);
    }
  }

  function onClearSearch() {
    setValue("search", "");
    executeCallback({});
  }

  async function onSubmit(data) {
    await executeCallback(data);
  }

  return (
    <>
      <Container className="g-0">
        <Row className="justify-content-md-center my-3">
          <Col xs lg={8}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <InputGroup>
                <FormControl placeholder="Buscar..." {...register("search")} />
                {getValues("search") && (
                  <Button
                    variant="outline-secondary"
                    onClick={onClearSearch}
                    size="sm"
                  >
                    <FaTimes />
                  </Button>
                )}
                <Button
                  style={{ zIndex: 0 }}
                  type="submit"
                  disabled={isSubmitting}
                  size="sm"
                >
                  {isSubmitting ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    <FaSearch />
                  )}
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
