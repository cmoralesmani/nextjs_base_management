import { useEffect, useState } from "react";

import { authService } from "src/services";

const { authSubject } = authService;

/**
 * Devuelve el objeto auth.
 * De tal manera que si esta no tiene ningun valor es porque no
 * esta logeado.
 * A la vez esta observando cuando la autenticación se modifica
 * y asi el estado auth siempre estara actualizado.
 */
export function useAuth() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const subscription = authSubject
      .getObservable()
      .subscribe((x) => setAuth(x));

    return () => subscription.unsubscribe();
  }, []);

  return { auth };
}
