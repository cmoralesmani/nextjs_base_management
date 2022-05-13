// pages/accounts/details/[id_user].jsx

import { useState } from "react";

import { SpinnerCustom } from "@app/components/elements";
import { SiteLayout } from "@app/components/layouts";
import { UserDetails } from "@app/components/templates";
import { userService } from "@app/services";

export default DetailUser;

function DetailUser({ id_user }) {
  const [user, setUser] = useState(null);

  const allowSelfUser = (permissions, user) => {
    if (!user) return;
    if (user.id_usuario === userService.userValue.id_user) {
      permissions.map((p) => {
        p.has_permission = true;
        return p;
      });
    }
  };

  const handleLoadInit = async () => {
    const user = await userService.getById(id_user);
    setUser(user);

    return (permissions) => {
      allowSelfUser(permissions, user);
    };
  };

  return (
    <SiteLayout
      titleSite="Detalle de Usuario"
      idPermission="CUEUS-VER"
      handleLoadInit={handleLoadInit}
    >
      {user ? <UserDetails user={user} /> : <SpinnerCustom />}
    </SiteLayout>
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
