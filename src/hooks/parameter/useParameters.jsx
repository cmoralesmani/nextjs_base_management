// src/hooks/profile/useProfiles.js

import { useCallback, useEffect, useState } from "react";

import { parametersService, toastService } from "src/services";
import { useIsMounted } from "..";

export function useParameters() {
  const [parameters, setParameters] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const isMounted = useIsMounted();

  useEffect(() => {
    if (error) {
      toastService.error(error?.message, { keepAfterRouteChange: true });
    }
  }, [error]);

  const getParameters = useCallback((filters = undefined) => {
    setIsLoading(true);
    return parametersService
      .getParameters(filters)
      .then((response) => isMounted() && setParameters(response))
      .catch((error) => isMounted() && setError(error))
      .finally(() => isMounted() && setIsLoading(false));
  }, []);

  useEffect(() => {
    getParameters();
  }, []);

  function setParametersCallback(filters) {
    return getParameters(filters);
  }

  return { parameters, isLoading, error, setParametersCallback };
}
