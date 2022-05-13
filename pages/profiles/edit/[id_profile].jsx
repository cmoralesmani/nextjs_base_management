// pages/profiles/edit/[id_profile].jsx

import { useState } from "react";
import { useRouter } from "next/router";

import { SpinnerCustom } from "@app/components/elements";
import { SiteLayout } from "@app/components/layouts";
import { AddEditProfile } from "@app/components/templates";
import { profileService, toastService } from "@app/services";

export default EditProfile;

function EditProfile({ id_profile }) {
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  function handleLoadInit() {
    return profileService
      .getProfileById(id_profile)
      .then((x) => {
        setProfile(x);
      })
      .catch((err) => {
        if (err.message == "Forbidden") {
          toastService.info(
            "No se puede cargar el detalle del perfil por falta de permiso",
            { keepAfterRouteChange: true }
          );
          router.push("/");
        }
      });
  }

  return (
    <SiteLayout
      titleSite="Edición de perfil"
      idPermission="PERFI-MODIF"
      handleLoadInit={handleLoadInit}
    >
      {profile ? <AddEditProfile profile={profile} /> : <SpinnerCustom />}
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
