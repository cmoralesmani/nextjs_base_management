// src/hooks/user/useUsers.jsx

import { userService } from "src/services";

import { useDataList } from "../useDataList";

export function useUsers() {
  const {
    data: users,
    isLoading,
    error,
    loadDataCallback: loadUsersCallback,
  } = useDataList({ sourceDataCallback: userService.getUsers });

  return { users, isLoading, error, loadUsersCallback };
}
