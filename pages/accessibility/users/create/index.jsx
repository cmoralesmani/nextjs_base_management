import { useEffect } from "react";

import { UserAddEdit } from "src/components/accessibility/users";
import { PageLayout } from "src/layouts";

export default function CreateUserPage() {
  const controllerRequestAPI = new AbortController();
  useEffect(() => () => controllerRequestAPI.abort(), []);

  return (
    <PageLayout codenamePermission={"create_user"}>
      <UserAddEdit controllerRequestAPI={controllerRequestAPI} />
    </PageLayout>
  );
}
