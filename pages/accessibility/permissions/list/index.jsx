import { useEffect } from "react";

import { PermissionsList } from "src/components/accessibility/permissions";
import { usePermissions } from "src/hooks/permission";
import { PageLayout } from "src/layouts";

export default function ListPermissionsPage() {
  const controllerRequestAPI = new AbortController();

  const { permissions, loadPermissionsCallback } = usePermissions({
    loadInitialData: false,
    controllerRequestAPI: controllerRequestAPI,
  });

  useEffect(() => () => controllerRequestAPI.abort(), []);

  return (
    <PageLayout codenamePermission="see_permissions">
      <PermissionsList
        permissions={permissions}
        loadPermissionsCallback={loadPermissionsCallback}
      />
    </PageLayout>
  );
}
