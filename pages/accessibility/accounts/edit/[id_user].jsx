// pages/accessibility/accounts/edit/[id_user].jsx

import router from "next/router";
import { useEffect, useCallback } from "react";

import { UserAddEdit } from "src/components/accounts";
import { useUser } from "src/hooks/user/useUser";
import { PageLayout } from "src/layouts";

export default EditUser;

function EditUser({ id_user }) {
  const { user, isLoading, error } = useUser({ id_user });

  useEffect(() => {
    if (!!error && error?.message == "Forbidden") router.push("/");
  }, [error]);

  const allowSelfUser = useCallback(
    async ({ id_user }) => {
      /*
      Callback que recibe el id_user de la sesion en cuestion
      y se devuelve verdadero si el usuario que esta intentando
      editar es el mismo que esta autenticado
      */
      if (user?.id_user === id_user) {
        return true;
      }
      return false;
    },
    [user]
  );

  return (
    <PageLayout
      titlePage="Edición de usuario"
      codenamePermission="alter_user"
      isLoading={isLoading}
      callbackHasPermission={allowSelfUser}
    >
      {!!user && <UserAddEdit user={user} />}
    </PageLayout>
  );
}

export async function getServerSideProps({ params }) {
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
