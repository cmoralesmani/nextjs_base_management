import { useEffect, useState } from "react";

import { userService, toastService } from "src/services";

import { useIsMounted } from "src/hooks/resources";

export function useUser({ id, controllerRequestAPI }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const isMounted = useIsMounted();

  useEffect(() => {
    if (error) {
      if (error.message == "Forbidden") {
        toastService.info(
          "No se puede cargar el detalle del usuario por falta de permiso",
          { keepAfterRouteChange: true }
        );
      } else {
        toastService.error(error?.message, { keepAfterRouteChange: true });
      }
    }
  }, [error]);

  useEffect(() => {
    setIsLoading(true);
    if (!!id) {
      const options = {
        signal: controllerRequestAPI?.signal,
      };
      userService
        .getUserById(id, options)
        .then((response) => isMounted() && setUser(response))
        .catch((error) => isMounted() && setError(error))
        .finally(() => isMounted() && setIsLoading(false));
    }
  }, [id]);

  return { user, isLoading, error };
}
