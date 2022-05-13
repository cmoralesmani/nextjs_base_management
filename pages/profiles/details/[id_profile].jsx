// pages/profiles/details/[id_profile].jsx

import { useState } from "react";

import { ProfileDetails } from "@app/components/templates";
import { SiteLayout } from "@app/components/layouts";
import { profileService } from "@app/services";

export default DetailsProfile;

function DetailsProfile({ id_profile }) {
  const [profile, setProfile] = useState(null);

  function handleLoadInit() {
    return profileService.getProfileById(id_profile).then((x) => {
      setProfile(x);
    });
  }

  return (
    <SiteLayout
      titleSite="Detalle de perfil"
      idPermission="PERFI-VER"
      handleLoadInit={handleLoadInit}
    >
      <ProfileDetails profile={profile} />
    </SiteLayout>
  );
}

export async function getServerSideProps({ params }) {
  const { id_profile } = params;
  if (!id_profile) {
    return {
      notFound: true,
    };
  }

  return {
    props: { id_profile },
  };
}
