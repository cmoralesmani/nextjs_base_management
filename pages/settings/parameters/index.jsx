// pages/settings/parameters/index.jsx

import { useState } from "react";

import { PageLayout } from "src/layouts";
import { ParametersList } from "src/components/templates";
import { parametersService } from "src/services";
import { useParameters } from "src/hooks/parameter/useParameters";

export default function ListParameters() {
  const { parameters, isLoading, error, setParametersCallback } =
    useParameters();

  return (
    <PageLayout
      codenamePermission={"see_parameters"}
      titlePage="Lista de Parametros"
    >
      <ParametersList
        parameters={parameters}
        updateParametersCallback={setParametersCallback}
      />
    </PageLayout>
  );
}
