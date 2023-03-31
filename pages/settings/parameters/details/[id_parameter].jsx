// pages/settings/parameters/details/[id_parameter].jsx

import { useState } from "react";

import { PageLayout } from "src/layouts";
import { ParametersDetails } from "src/components/templates";
import { parametersService, toastService } from "src/services";

export default DetailsParameter;

function DetailsParameter({ id_parameter }) {
  const [parameter, setParameter] = useState(null);

  function handleLoadInit() {
    return parametersService
      .getById(id_parameter)
      .then((x) => {
        setParameter(x);
      })
      .catch((err) => {
        toastService.error(err.message);
      });
  }

  return (
    // <PageLayout
    //   titleSite="Detalle de parametro"
    //   idPermission="see_single_parameter"
    //   handleLoadInit={handleLoadInit}
    // >
    <PageLayout
      titlePage="Detalle de parametro"
      codenamePermission="see_single_parameter"
    >
      <ParametersDetails parameter={parameter} />
    </PageLayout>
  );
}

export async function getServerSideProps({ params }) {
  const { id_parameter } = params;
  if (!id_parameter) {
    return {
      notFound: true,
    };
  }

  return {
    props: { id_parameter },
  };
}
