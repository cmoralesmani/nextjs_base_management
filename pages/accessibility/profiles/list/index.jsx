import { useEffect } from "react";

import { ProfilesList } from "src/components/accessibility/profiles";
import { useProfiles } from "src/hooks/profile";
import { PageLayout } from "src/layouts";

export default function ListProfilesPage() {
  const controllerRequestAPI = new AbortController();

  const { profiles, loadProfilesCallback, deleteProfileCallback } = useProfiles(
    {
      loadInitialData: false,
      controllerRequestAPI: controllerRequestAPI,
    }
  );

  useEffect(() => () => controllerRequestAPI.abort(), []);

  return (
    <PageLayout codenamePermission="see_profiles">
      <ProfilesList
        profiles={profiles}
        loadProfilesCallback={loadProfilesCallback}
        deleteProfileCallback={deleteProfileCallback}
      />
    </PageLayout>
  );
}
