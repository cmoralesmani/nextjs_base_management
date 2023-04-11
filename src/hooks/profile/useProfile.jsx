// src/hooks/user/useUser.jsx

import { useEffect, useState } from "react";

import { profileService, toastService } from "src/services";

import { useIsMounted } from "..";

export function useProfile({ id_profile }) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const isMounted = useIsMounted();

  useEffect(() => {
    if (error) {
      if (error.message == "Forbidden") {
        toastService.info(
          "No se puede cargar el detalle del perfil por falta de permiso",
          { keepAfterRouteChange: true }
        );
      } else {
        toastService.error(error?.message, { keepAfterRouteChange: true });
      }
    }
  }, [error]);

  useEffect(() => {
    setIsLoading(true);
    profileService
      .getProfileById(id_profile)
      .then((response) => isMounted() && setProfile(response))
      .catch((error) => isMounted() && setError(error))
      .finally(() => isMounted() && setIsLoading(false));
  }, [isMounted, id_profile]);

  return { profile, isLoading, error };
}
