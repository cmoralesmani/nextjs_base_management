import { useEffect, useState } from "react";
import Error from "next/error";
import { TitlePage } from "src/components/title-page";
import { useSelector } from "react-redux";

import { titleService } from "src/services";
import { useHasPermissionStatus } from "src/hooks/auth";
import { LottieLoading } from "src/components/miscellaneous/lotties";
import { useIsMounted } from "src/hooks";

import { selectUserState } from "src/redux/slices/user-slice";

export function PageLayout({
  children,
  codenamePermission,
  titlePage = "",
  isLoading = false,
  handleLoadInit = async () => {},
}) {
  const [pageStatus, setPageStatus] = useState("waiting");
  const isMounted = useIsMounted();
  const hasPermission = useHasPermissionStatus({ codenamePermission });
  const userState = useSelector(selectUserState);

  useEffect(() => {
    titleService.setTitle(titlePage);

    handleLoadInit()
      .then((callback) => {
        if (isMounted()) {
          setPageStatus(hasPermission ? "ok" : "without_permission");
          if (!!callback && !!useState) {
            const { id_user } = userState;
            callback({ id_user, setPageStatus });
          }
        }
      })
      .catch(() => isMounted() && setPageStatus("not_found"));
  }, [titlePage, hasPermission, handleLoadInit, isMounted, userState]);

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
