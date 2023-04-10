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

import { useEffect, useState } from "react";

import { PageLayout } from "src/layouts";
import { UserList } from "src/components/accounts";
// import { UserList } from "src/components/templates";
import { userService, toastService } from "src/services";
import { useUsers } from "src/hooks/user/useUsers";

export default AccountsPage;

function AccountsPage() {
  const { users, isLoading, error, setUsersCallback } = useUsers();

  useEffect(() => {
    if (error) {
      toastService.error(error.message, { keepAfterRouteChange: true });
    }
  }, [error]);

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
    <PageLayout codenamePermission={"see_users"} titlePage="Lista de Usuarios">
      <UserList
        users={users}
        updateUsersCallback={setUsersCallback}
        deleteUserCallback={deleteUserCallback}
      />
    </PageLayout>
  );
}
