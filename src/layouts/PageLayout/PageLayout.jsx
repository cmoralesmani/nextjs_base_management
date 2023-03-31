import { useEffect } from "react";
import Error from "next/error";
import { TitlePage } from "src/components/title-page";

import { titleService } from "src/services";
import { useHasPermissionStatus } from "src/hooks/auth";

export function PageLayout({ children, codenamePermission, titlePage = "" }) {
  const hasPermission = useHasPermissionStatus({ codenamePermission });

  useEffect(() => {
    titleService.setTitle(titlePage);
  }, []);

  if (hasPermission === null) return null;

  return !!hasPermission ? (
    <>
      <TitlePage />
      {children}
    </>
  ) : (
    <Error statusCode={403} />
  );
}
