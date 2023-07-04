import { useRouter } from "next/router";
import { useEffect } from "react";
import { PermissionAddEdit } from "src/components/accessibility/permissions/PermissionAddEdit";

import { LottieLoading } from "src/components/miscellaneous/lotties";
import { usePermission } from "src/hooks/permission";
import { PageLayout } from "src/layouts";

export default function EditPermissionPage() {
  const controllerRequestAPI = new AbortController();
  useEffect(() => () => controllerRequestAPI.abort(), []);

  const router = useRouter();
  const { id } = router.query;

  const { permission, isLoading } = usePermission({ id, controllerRequestAPI });

  return (
    <PageLayout codenamePermission="alter_permission">
      {!!isLoading ? (
        <LottieLoading />
      ) : (
        <PermissionAddEdit
          permission={permission}
          controllerRequestAPI={controllerRequestAPI}
        />
      )}
    </PageLayout>
  );
}
