// pages/accounts/edit/[id_user].jsx

import router from "next/router";
import { useState } from "react";

import { SpinnerCustom } from "src/components/elements";
import { PageLayout } from "src/layouts";
import { UserAddEdit } from "src/components/templates";
import { toastService, userService } from "src/services";

export default EditUser;

function EditUser({ id_user }) {
  const [user, setUser] = useState(null);

  function allowSelfUser(setHasPermission) {
    /*
        Callback que recibe la funcion que modifica el permiso
        y se establece en verdadero si el usuario que esta intentando
        editar es el mismo que esta autenticado 
        */
    if (id_user === userService.userValue.id_user) setHasPermission(true);
  }

  function handleLoadInit() {
    return userService
      .getById(id_user)
      .then((x) => {
        setUser(x);
      })
      .catch((err) => {
        if (err.message == "Forbidden") {
          toastService.info(
            "No se puede cargar el detalle del usuario por falta de permiso",
            { keepAfterRouteChange: true }
          );
          router.push("/");
        }
      });
  }

  return (
    // <PageLayout
    //   titleSite="Edición de usuario"
    //   idPermission="alter_user"
    //   callbackHasPermission={allowSelfUser}
    //   handleLoadInit={handleLoadInit}
    // >
    <PageLayout titlePage="Edición de usuario" codenamePermission="alter_user">
      {user ? <UserAddEdit user={user} /> : <SpinnerCustom />}
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
