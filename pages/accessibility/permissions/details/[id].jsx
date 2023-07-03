import { useRouter } from "next/router";

import { PermissionDetails } from "src/components/accessibility/permissions";
import { usePermission } from "src/hooks/permission";
import { PageLayout } from "src/layouts";

export default function DetailsProfilePage() {
  const router = useRouter();
  const { id } = router.query;

  const { permission } = usePermission(id);

  return (
    <PageLayout codenamePermission="see_single_permission">
      {!!permission && <PermissionDetails permission={permission} />}
    </PageLayout>
  );
}
