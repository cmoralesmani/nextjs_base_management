// pages/profiles/edit/[id_profile].jsx

import { useRouter } from "next/router";

import { SpinnerCustom } from "src/components/elements";
import { PageLayout } from "src/layouts";
import { AddEditProfile } from "src/components/profiles";
import { useProfile } from "src/hooks/profile/useProfile";
import { useEffect } from "react";

export default EditProfile;

function EditProfile({ id_profile }) {
  const { profile, isLoading, error } = useProfile({ id_profile });
  const router = useRouter();

  useEffect(() => {
    if (!!error && error?.message == "Forbidden") router.push("/");
  }, [error]);

  return (
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
