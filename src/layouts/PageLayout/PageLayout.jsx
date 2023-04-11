// src/layouts/PageLayout/PageLayout.jsx

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Error from "next/error";

import { LottieLoading } from "src/components/miscellaneous/lotties";
import { TitlePage } from "src/components/title-page";
import { useIsMounted } from "src/hooks";
import { useHasPermissionStatus } from "src/hooks/auth";
import { titleService } from "src/services";

import { selectUserState } from "src/redux/slices/user-slice";

export default PageLayout;

/**
 * callbackHasPermission se ejecuta en caso de que no se tenga el permiso correspondiente a codenamePermission.
 * Esto es porque se puede querer que tenga permiso mas concreto.
 */
function PageLayout({
  children,
  codenamePermission,
  titlePage = "",
  isLoading = false,
  callbackHasPermission,
}) {
  const [pageStatus, setPageStatus] = useState("waiting");
  const isMounted = useIsMounted();
  const hasPermission = useHasPermissionStatus({ codenamePermission });
  const userState = useSelector(selectUserState);

  useEffect(() => {
    if (isMounted()) setPageStatus(hasPermission ? "ok" : "without_permission");
  }, [isMounted, hasPermission]);

  useEffect(() => {
    titleService.setTitle(titlePage);

    if (isMounted()) {
      // setPageStatus(hasPermission ? "ok" : "without_permission");
      if (
        !!callbackHasPermission &&
        !!userState &&
        !isLoading &&
        !hasPermission
      ) {
        const { id_user } = userState;
        if (!id_user) console.warn("No id_user defined for user on page");
        callbackHasPermission({ id_user })
          .then(
            (hasSpecialPermission) =>
              isMounted() &&
              setPageStatus(hasSpecialPermission ? "ok" : "without_permission")
          )
          .catch(() => isMounted() && setPageStatus("not_found"));
      }
    }
  }, [
    titlePage,
    isMounted,
    callbackHasPermission,
    isLoading,
    userState,
    hasPermission,
  ]);

  if (hasPermission === null) return null;

  return !!isLoading ? (
    <LottieLoading />
  ) : pageStatus === "without_permission" ? (
    <Error statusCode={403} />
  ) : pageStatus === "not_found" ? (
    <Error statusCode={404} />
  ) : (
    <>
      <TitlePage />
      {children}
    </>
  );
}
