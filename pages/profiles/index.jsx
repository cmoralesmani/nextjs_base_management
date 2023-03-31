// pages/profiles/index.jsx

import { useState } from "react";

import { PageLayout } from "src/layouts";
import { ProfileList } from "src/components/templates";
import { profileService, toastService } from "src/services";

export default ListProfile;

function ListProfile() {
  const [profiles, setProfiles] = useState();

  function updateProfilesCallback(filters) {
    setProfiles(null);
    return profileService.getProfiles(filters).then((u) => {
      setProfiles(u.profiles);
    });
  }

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
    // <PageLayout
    //   titleSite="Lista de perfiles"
    //   idPermission="see_profiles"
    //   handleLoadInit={async () => {}}
    // >
    <PageLayout codenamePermission={"see_users"} titlePage="Lista de perfiles">
      <ProfileList
        profiles={profiles}
        updateProfilesCallback={updateProfilesCallback}
        deleteProfileCallback={deleteProfileCallback}
      />
    </PageLayout>
    // </PageLayout>
  );
}
