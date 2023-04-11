// pages/accessibility/accounts/details/[id_user].jsx

import { useCallback } from "react";

import { UserDetails } from "src/components/accounts";
import { useUser } from "src/hooks/user/useUser";
import { PageLayout } from "src/layouts";

export default function DetailUserPage({ id_user }) {
  const { user, isLoading } = useUser({ id_user });

  const allowSelfUser = useCallback(
    async ({ id_user }) => {
      if (user?.id_user === id_user) {
        return true;
      }
      return false;
    },
    [user]
  );

  return (
    <PageLayout
      titlePage="Detalle de Usuario"
      codenamePermission="see_single_user"
      isLoading={isLoading}
      callbackHasPermission={allowSelfUser}
    >
      {!!user && <UserDetails user={user} />}
    </PageLayout>
  );
}

export async function getServerSideProps({ params }) {
  /* Esta funcion es propia del framework nextjs
  Se ejecuta en el servidor y lo que hacemos es capturar los 
  parametros para injectarlo en las propiedades del componente
  de este archivo por lo que le pasamos el id_user, que
  va en la url. */
  const { id_user } = params;

  if (!id_user) {
    return {
      notFound: true,
    };
  }

  return {
    props: { id_user },
  };
}
