import { useState, useEffect } from "react";

import { useAuth } from "src/hooks/auth";
import { userService } from "src/services";

/**
 * Obtiene del API la informacioni del usuario que esta actualmente autenticado
 */
export function useUserAuth() {
  const { auth } = useAuth();
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (!!auth) {
      userService
        .getByUsername(auth.username)
        .then((user) => setUser(user))
        .catch((error) => setError(error));
    }
  }, [auth]);

  return { auth, user, error };
}
