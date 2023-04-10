// pages/accessibility/accounts/details/[id_user].jsx

import { useState } from "react";

import { SpinnerCustom } from "src/components/elements";
import { PageLayout } from "src/layouts";
import { UserDetails } from "src/components/accounts";
import { userService } from "src/services";
import { useUser } from "src/hooks/user/useUser";

export default function DetailUserPage(params) {
  const { id_user } = params;
  const { user, isLoading } = useUser({ id_user });

  const allowSelfUser = (id_user, setPageStatus) => {
    if (!user) return;
    if (user.id_user === id_user) {
      setPageStatus("ok");
    }
  };

  const handleLoadInit = async () => {
    return ({ id_user, setPageStatus }) => {
      allowSelfUser(id_user, setPageStatus);
    };
  };

  return (
    <PageLayout
      titlePage="Detalle de Usuario"
      codenamePermission="see_single_user"
      isLoading={isLoading}
      handleLoadInit={handleLoadInit}
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
