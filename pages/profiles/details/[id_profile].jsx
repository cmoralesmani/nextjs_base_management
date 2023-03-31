// pages/profiles/details/[id_profile].jsx

import { useState } from "react";

import { ProfileDetails } from "src/components/templates";
import { PageLayout } from "src/layouts";
import { profileService } from "src/services";

export default DetailsProfile;

function DetailsProfile({ id_profile }) {
  const [profile, setProfile] = useState(null);

  function handleLoadInit() {
    return profileService.getProfileById(id_profile).then((x) => {
      setProfile(x);
    });
  }

  return (
    // <PageLayout
    //   titleSite="Detalle de perfil"
    //   idPermission="see_single_profile"
    //   handleLoadInit={handleLoadInit}
    // >
    <PageLayout
      titlePage="Detalle de perfil"
      codenamePermission="see_single_profile"
    >
      <ProfileDetails profile={profile} />
    </PageLayout>
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
