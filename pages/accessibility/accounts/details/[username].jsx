// pages/accounts/details/[id_user].jsx

import { useState } from "react";

import { SpinnerCustom } from "src/components/elements";
import { PageLayout } from "src/layouts";
import { UserDetails } from "src/components/templates";
import { userService } from "src/services";

export default DetailUser;

function DetailUser({ username }) {
  const [user, setUser] = useState(null);

  const allowSelfUser = (permissions, user) => {
    if (!user) return;
    if (user.id_user === userService.userValue.id_user) {
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
    // <PageLayout
    //   titleSite="Detalle de Usuario"
    //   idPermission="see_single_user"
    //   handleLoadInit={handleLoadInit}
    // >
    <PageLayout
      titlePage="Detalle de Usuario"
      codenamePermission="see_single_user"
    >
      {user ? <UserDetails user={user} /> : <SpinnerCustom />}
    </PageLayout>
  );
}

export async function getServerSideProps({ params }) {
  /* Esta funcion es propia del framework nextjs
  Se ejecuta en el servidor y lo que hacemos es capturar los 
  parametros para injectarlo en las propiedades del componente
  de este archivo por lo que le pasamos el id_user, que
  va en la url. */
  const { username } = params;
  if (!username) {
    return {
      notFound: true,
    };
  }

  return {
    props: { username },
  };
}
