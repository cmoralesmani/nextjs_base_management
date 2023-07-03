import { useEffect } from "react";

import { ParametersList } from "src/components/maintenance/parameters";
import { useParameters } from "src/hooks/parameter";
import { PageLayout } from "src/layouts";

export default function ListParametersPage() {
  const controllerRequestAPI = new AbortController();
  useEffect(() => () => controllerRequestAPI.abort(), []);

  const { parameters, loadParametersCallback } = useParameters({
    loadInitialData: false,
    controllerRequestAPI: controllerRequestAPI,
  });

  return (
    <PageLayout codenamePermission={"see_parameters"}>
      <ParametersList
        parameters={parameters}
        loadParametersCallback={loadParametersCallback}
      />
    </PageLayout>
  );
}
