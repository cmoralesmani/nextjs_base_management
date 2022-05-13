// pages/profiles/index.jsx

import { useState } from "react";

import { SiteLayout } from "@app/components/layouts";
import { ProfileList } from "@app/components/templates";
import { profileService, toastService } from "@app/services";

export default ListProfile;

function ListProfile() {
  const [profiles, setProfiles] = useState();

  function updateProfilesCallback(filters) {
    setProfiles(null);
    return profileService.getProfiles(filters).then((u) => {
      setProfiles(u.perfiles);
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
    <SiteLayout
      titleSite="Lista de perfiles"
      idPermission="PERFI-LISTA"
      handleLoadInit={async () => {}}
    >
      <ProfileList
        profiles={profiles}
        updateProfilesCallback={updateProfilesCallback}
        deleteProfileCallback={deleteProfileCallback}
      />
    </SiteLayout>
  );
}
