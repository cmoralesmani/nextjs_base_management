// pages/accessibility/profiles/index.jsx

import { PageLayout } from "src/layouts";
import { ProfileList } from "src/components/templates";
import { profileService, toastService } from "src/services";
import { useProfiles } from "src/hooks/profile/useProfiles";

export default ProfilesPage;

function ProfilesPage() {
  const { profiles, isLoading, error, setProfilesCallback } = useProfiles();

  function deleteProfileCallback(id_profile) {
    return profileService
      .deleteProfile(id_profile)
      .then(() => {
        const timer = setTimeout(() => {
          setProfiles((profiles) =>
            profiles.filter((x) => x.id_perfil !== id_profile)
          );
        });

        toastService.success("Se eliminó correctamente el perfil");
        return () => {
          clearTimeout(timer);
        };
      })
      .catch((error) => {
        toastService.warn(error.message);
      });
  }

  return (
    <PageLayout
      codenamePermission={"see_profiles"}
      titlePage="Lista de perfiles"
    >
      <ProfileList
        profiles={profiles}
        updateProfilesCallback={setProfilesCallback}
        deleteProfileCallback={deleteProfileCallback}
      />
    </PageLayout>
  );
}
