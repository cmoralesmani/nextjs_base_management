// pages/accounts/index.jsx

// import { PageLayout } from "src/layouts";
// import { UserList } from "src/components/accounts";

// export default function AccountsPage() {
//   return (
//     <PageLayout codenamePermission={"see_users"}>
//       <UserList />
//     </PageLayout>
//   );
// }

import { useState } from "react";

import { PageLayout } from "src/layouts";
import { UserList } from "src/components/accounts";
// import { UserList } from "src/components/templates";
import { userService, toastService } from "src/services";

export default AccountsPage;

function AccountsPage() {
  const [users, setUsers] = useState(null);

  function updateUsersCallback(filters) {
    setUsers(null);
    return userService.getUsers(filters).then((u) => {
      setUsers(u.users);
    });
  }

  function deleteUserCallback(id_user) {
    return userService
      .delete(id_user)
      .then(() => {
        const timer = setTimeout(() => {
          setUsers((users) => users.filter((x) => x.id_user !== id_user));
        });
        toastService.success("Se eliminó correctamente el usuario");
        return () => {
          clearTimeout(timer);
        };
      })
      .catch((error) => {
        toastService.warn(error.message);
      });
  }
  return (
    // <SiteLayout
    //   titleSite="Lista de Usuarios"
    //   idPermission="CUEUS-LISTA"
    //   handleLoadInit={async () => {}}
    // >
    <PageLayout codenamePermission={"see_users"} titlePage="Lista de Usuarios">
      <UserList
        users={users}
        updateUsersCallback={updateUsersCallback}
        deleteUserCallback={deleteUserCallback}
      />
      {/* </SiteLayout> */}
    </PageLayout>
  );
}
