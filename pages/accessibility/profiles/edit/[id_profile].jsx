// pages/profiles/edit/[id_profile].jsx

import { useState } from "react";
import { useRouter } from "next/router";

import { SpinnerCustom } from "src/components/elements";
import { PageLayout } from "src/layouts";
import { AddEditProfile } from "src/components/templates";
import { profileService, toastService } from "src/services";

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
    // <PageLayout
    //   titleSite="Edición de perfil"
    //   idPermission="alter_profile"
    //   handleLoadInit={handleLoadInit}
    // >
    <PageLayout
      titlePage="Edición de perfil"
      codenamePermission="alter_profile"
    >
      {profile ? <AddEditProfile profile={profile} /> : <SpinnerCustom />}
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
