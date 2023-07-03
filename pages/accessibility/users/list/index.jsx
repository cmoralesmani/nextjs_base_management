import { useEffect } from "react";

import { UsersList } from "src/components/accessibility/users";
import { useUsers } from "src/hooks/user";
import { PageLayout } from "src/layouts";

export default function ListUsersPage() {
  const controllerRequestAPI = new AbortController();

  const { users, loadUsersCallback, deleteUserCallback } = useUsers({
    loadInitialData: false,
    controllerRequestAPI: controllerRequestAPI,
  });

  useEffect(() => () => controllerRequestAPI.abort(), []);

  return (
    <PageLayout codenamePermission={"see_users"}>
      <UsersList
        users={users}
        loadUsersCallback={loadUsersCallback}
        deleteUserCallback={deleteUserCallback}
      />
    </PageLayout>
  );
}
