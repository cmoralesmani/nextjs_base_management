// pages/accounts/index.jsx

import { useState } from "react";

import { SiteLayout } from "@app/components/layouts";
import { UserList } from "@app/components/templates";
import { userService, toastService } from "@app/services";

export default ListUser;

function ListUser() {
  const [users, setUsers] = useState(null);

  function updateUsersCallback(filters) {
    setUsers(null);
    return userService.getUsers(filters).then((u) => {
      setUsers(u.users);
    });
  }

  function deleteUserCallback(id_usuario) {
    return userService
      .delete(id_usuario)
      .then(() => {
        const timer = setTimeout(() => {
          setUsers((users) => users.filter((x) => x.id_usuario !== id_usuario));
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
    <SiteLayout
      titleSite="Lista de Usuarios"
      idPermission="CUEUS-LISTA"
      handleLoadInit={async () => {}}
    >
      <UserList
        users={users}
        updateUsersCallback={updateUsersCallback}
        deleteUserCallback={deleteUserCallback}
      />
    </SiteLayout>
  );
}
