import Error from "next/error";

import { useHasPermissionStatus } from "src/hooks/auth";

export function PageLayout({ children, codenamePermission }) {
  const hasPermission = useHasPermissionStatus({ codenamePermission });

  if (hasPermission === null) return null;

  return !!hasPermission ? children : <Error statusCode={403} />;
}
