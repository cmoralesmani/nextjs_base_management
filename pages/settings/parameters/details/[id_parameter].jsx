// pages/settings/parameters/details/[id_parameter].jsx

import { useState } from "react";

import { SiteLayout } from "@app/components/layouts";
import { ParametersDetails } from "@app/components/templates";
import { parametersService, toastService } from "@app/services";

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
    <SiteLayout
      titleSite="Detalle de parametro"
      idPermission="PARAM-VER"
      handleLoadInit={handleLoadInit}
    >
      <ParametersDetails parameter={parameter} />
    </SiteLayout>
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
