// src/hooks/user/useUsers.js

import { useCallback, useEffect, useState } from "react";

import { userService } from "src/services";
import { useIsMounted } from "..";

/**
 * Obtiene del API la lista de usuarios
 */
export function useUsers() {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const isMounted = useIsMounted();

  const getUsers = useCallback((filters = undefined) => {
    setIsLoading(true);
    return userService
      .getUsers(filters)
      .then((response) => isMounted() && setUsers(response))
      .catch((error) => isMounted() && setError(error))
      .finally(() => isMounted() && setIsLoading(false));
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  function setUsersCallback(filters) {
    return getUsers(filters);
  }

  return { users, isLoading, error, setUsersCallback };
}
