import { useEffect } from "react";
import { ProfileAddEdit } from "src/components/accessibility/profiles";
import { PageLayout } from "src/layouts";

export default function CreateProfilePage() {
  const controllerRequestAPI = new AbortController();
  useEffect(() => () => controllerRequestAPI.abort(), []);

  return (
    <PageLayout codenamePermission="create_profile">
      <ProfileAddEdit controllerRequestAPI={controllerRequestAPI} />
    </PageLayout>
  );
}
