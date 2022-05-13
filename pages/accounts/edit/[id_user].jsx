// pages/accounts/edit/[id_user].jsx

import router from "next/router";
import { useState } from "react";

import { SpinnerCustom } from "@app/components/elements";
import { SiteLayout } from "@app/components/layouts";
import { UserAddEdit } from "@app/components/templates";
import { toastService, userService } from "@app/services";

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
    <SiteLayout
      titleSite="Edición de usuario"
      idPermission="CUEUS-MODIF"
      callbackHasPermission={allowSelfUser}
      handleLoadInit={handleLoadInit}
    >
      {user ? <UserAddEdit user={user} /> : <SpinnerCustom />}
    </SiteLayout>
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
