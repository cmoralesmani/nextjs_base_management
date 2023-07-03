import { useEffect } from "react";

import { ParametersList } from "src/components/maintenance/parameters";
import { useParameters } from "src/hooks/parameter";
import { PageLayout } from "src/layouts";

export default function ListParametersPage() {
  const controllerRequestAPI = new AbortController();
  const { parameters, loadParametersCallback } = useParameters({
    loadInitialData: false,
    controllerRequestAPI: controllerRequestAPI,
  });
  useEffect(() => () => controllerRequestAPI.abort(), []);

  return (
    <PageLayout codenamePermission={"see_parameters"}>
      <ParametersList
        parameters={parameters}
        loadParametersCallback={loadParametersCallback}
      />
    </PageLayout>
  );
}
