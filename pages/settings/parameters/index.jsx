// pages/settings/parameters/index.jsx

import { useState } from "react";

import { PageLayout } from "src/layouts";
import { ParametersList } from "src/components/templates";
import { parametersService } from "src/services";

export default function ListParameters() {
  const [parameters, setParameters] = useState(null);

  function updateParametersCallback(filters) {
    setParameters(null);
    return parametersService.getParameters(filters).then((b) => {
      setParameters(b.parametros);
    });
  }

  return (
    // <PageLayout
    //   titleSite="Lista de Parametros"
    //   idPermission="see_parameters"
    //   handleLoadInit={async () => {}}
    // >
    <PageLayout
      codenamePermission={"see_users"}
      titlePage="Lista de Parametros"
    >
      <ParametersList
        parameters={parameters}
        updateParametersCallback={updateParametersCallback}
        setParameters={setParameters}
      />
    </PageLayout>
    // </PageLayout>
  );
}
