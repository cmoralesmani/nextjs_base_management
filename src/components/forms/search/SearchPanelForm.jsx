// src/components/forms/search/SearchForm.jsx

import { Formik } from "formik";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useRef, useEffect, useMemo } from "react";

import { PanelFormLayout } from "src/layouts/forms";
import { toastService } from "src/services";
import { utilitiesForms } from "src/utilities";

import { SearchForm } from "./SearchForm";

import { FORM_SEARCH_EMPTY_VALUES } from "src/utilities/forms/types.d";

const { formSearchSchema } = utilitiesForms;

export { SearchPanelForm };

SearchPanelForm.propTypes = {
  loadDataCallback: PropTypes.func.isRequired,
  urlBaseDownload: PropTypes.string.isRequired,
  setUrlDownload: PropTypes.func.isRequired,
};

function SearchPanelForm({
  loadDataCallback,
  urlBaseDownload,
  setUrlDownload,
}) {
  /**
   * Ya que hay varias vista que comparten esta forma de consultar datos
   * se hizo este componente para reutilizarlo en los sitios donde
   * hay una lista que es filtrada por un unico campo Buscar...
   * loadDataCallback: Es una funcion que conoce la funcionalidad de
   *  actualizar sus datos para mostrarse en la tabla correspondiente
   * setUrlDownload: Es un metodo de useState() para actualizar la
   *  url dependiendo de la busqueda.
   */
  const formRef = useRef();

  // Establecer los valores por defecto del formulario
  const { query } = useRouter();

  const defaultValues = useMemo(() => {
    const filters_q = query?.filters;
    const filters = filters_q ? JSON.parse(filters_q) : {};

    return {
      search: filters?.search || "",
    };
  }, [query]);

  useEffect(() => {
    const { submitForm, setValues } = formRef.current;
    // https://github.com/jaredpalmer/formik/issues/529#issuecomment-402763988
    setValues(defaultValues);
    setTimeout(submitForm, 1);
  }, [defaultValues]);

  async function handleSubmitSearch(values) {
    // values son los datos del formulario tal y como los maneja el formulario
    const paramsUrlStr = `?filters=${encodeURIComponent(
      JSON.stringify(values)
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
      await loadDataCallback(values);
    } catch (err) {
      toastService.error(err.message);
    }
  }

  return (
    <PanelFormLayout>
      <Formik
        initialValues={FORM_SEARCH_EMPTY_VALUES}
        validationSchema={formSearchSchema}
        onSubmit={async (values, formikHelpers) => {
          await handleSubmitSearch(values, formikHelpers);
        }}
        component={SearchForm}
        innerRef={(f) => (formRef.current = f)}
      ></Formik>
    </PanelFormLayout>
  );
}
