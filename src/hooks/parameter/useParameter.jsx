// src/hooks/parameter/useParameter.jsx

import { useEffect, useState } from "react";

import { parametersService, toastService } from "src/services";

import { useIsMounted } from "..";

export function useParameter({ id_parameter }) {
  const [parameter, setParameter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const isMounted = useIsMounted();

  useEffect(() => {
    if (error) {
      toastService.error(error?.message, { keepAfterRouteChange: true });
    }
  }, [error]);

  useEffect(() => {
    setIsLoading(true);
    parametersService
      .getById(id_parameter)
      .then((response) => isMounted() && setParameter(response))
      .catch((error) => isMounted() && setError(error))
      .finally(() => isMounted() && setIsLoading(false));
  }, [isMounted, id_parameter]);

  return { parameter, isLoading, error };
}
