// pages/profiles/details/[id_profile].jsx

import { ProfileDetails } from "src/components/profiles";
import { useProfile } from "src/hooks/profile/useProfile";
import { PageLayout } from "src/layouts";

export default DetailsProfile;

function DetailsProfile({ id_profile }) {
  const { profile, isLoading } = useProfile({ id_profile });

  return (
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
