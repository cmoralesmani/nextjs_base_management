// src/layouts/PageLayout/PageLayout.jsx

import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Error from "next/error";

import { LottieLoading } from "src/components/miscellaneous/lotties";
import { TitlePage } from "src/components/title-page";
import { useIsMounted } from "src/hooks";
import { useHasPermissionStatus } from "src/hooks/auth";
import { titleService } from "src/services";

import { selectUserState } from "src/redux/slices/user-slice";

const STATUS_PAGE = {
  WAITING: { text: "WAITING", isLoading: true },
  OK: { text: "OK", isLoading: false },
  NOT_FOUND: { text: "NOT_FOUND", isLoading: false },
  WITHOUT_PERMISSION: { text: "WITHOUT_PERMISSION", isLoading: false },
};

export default memo(PageLayout);

/**
 * callbackHasPermission se ejecuta en caso de que no se tenga el permiso correspondiente a codenamePermission.
 * Esto es porque se puede querer que tenga permiso mas concreto.
 */
function PageLayout({
  children,
  codenamePermission,
  titlePage = "",
  isLoading,
  callbackHasPermission,
}) {
  // const [isPageLoading, setIsPageLoading] = useState(true);
  const [pageStatus, setPageStatus] = useState(STATUS_PAGE.WAITING);

  const isMounted = useIsMounted();
  const hasPermission = useHasPermissionStatus({ codenamePermission });
  const userState = useSelector(selectUserState);

  useEffect(() => {
    titleService.setTitle(titlePage);
  }, [titlePage]);

  useEffect(() => {
    if (hasPermission != null) {
      if (!isLoading) {
        // El componente externo no esta cargando nada y tiene permiso
        setPageStatus(
          !!hasPermission ? STATUS_PAGE.OK : STATUS_PAGE.WITHOUT_PERMISSION
        );
      }
    }
  }, [isLoading, hasPermission]);

  useEffect(() => {
    if (
      isMounted() && // Esta montado
      !!callbackHasPermission && // Hay un funcion callback que indica si tiene o no tiene permiso
      !!userState && // Hay datos del usuario en cuestion que inicio sesion
      pageStatus !== STATUS_PAGE.WAITING && // No se esta esperando (Es decir, ya se establecio un estado final para la pagina)
      !hasPermission // No tiene el permiso convencional para acceder a la página
    ) {
      const { id_user } = userState;
      if (!id_user) console.warn("No id_user defined for user on page");
      callbackHasPermission({ id_user })
        .then(
          (hasSpecialPermission) =>
            isMounted() &&
            setPageStatus(
              hasSpecialPermission
                ? STATUS_PAGE.OK
                : STATUS_PAGE.WITHOUT_PERMISSION
            )
        )
        .catch(() => isMounted() && setPageStatus(STATUS_PAGE.NOT_FOUND));
    }
  }, [isMounted, userState, pageStatus, hasPermission]);

  return pageStatus?.isLoading ? (
    <LottieLoading />
  ) : pageStatus === STATUS_PAGE.WITHOUT_PERMISSION ? (
    <Error statusCode={403} />
  ) : pageStatus === STATUS_PAGE.NOT_FOUND ? (
    <Error statusCode={404} />
  ) : (
    <>
      <TitlePage />
      {children}
    </>
  );
}
