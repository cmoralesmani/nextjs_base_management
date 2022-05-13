// pages/settings/parameters/index.jsx

import { useState } from "react";

import { SiteLayout } from "@app/components/layouts";
import { ParametersList } from "@app/components/templates";
import { parametersService } from "@app/services";

export default function ListParameters() {
  const [parameters, setParameters] = useState(null);

  function updateParametersCallback(filters) {
    setParameters(null);
    return parametersService.getParameters(filters).then((b) => {
      setParameters(b.parametros);
    });
  }

  return (
    <SiteLayout
      titleSite="Lista de Parametros"
      idPermission="PARAM-LISTA"
      handleLoadInit={async () => {}}
    >
      <ParametersList
        parameters={parameters}
        updateParametersCallback={updateParametersCallback}
        setParameters={setParameters}
      />
    </SiteLayout>
  );
}
