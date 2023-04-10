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
      toastService.error(error?.message, { keepAfterRouteChange: true });
    }
  }, [error]);

  useEffect(() => {
    setIsLoading(true);
    console.log(">>>> 66 ", id_user);
    setTimeout(
      () =>
        userService
          .getUserById(id_user)
          .then((response) => isMounted() && setUser(response))
          .catch((error) => isMounted() && setError(error))
          .finally(() => isMounted() && setIsLoading(false)),
      100
    );
  }, [isMounted, id_user]);

  return { user, isLoading, error };
}
