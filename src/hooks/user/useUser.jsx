// src/hooks/user/useUser.jsx

import { useEffect, useState } from "react";

import { userService, toastService } from "src/services";

import { useIsMounted } from "..";

export function useUser({ id_user }) {
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
    userService
      .getUserById(id_user)
      .then((response) => isMounted() && setUser(response))
      .catch((error) => isMounted() && setError(error))
      .finally(() => isMounted() && setIsLoading(false));
  }, [isMounted, id_user]);

  return { user, isLoading, error };
}
