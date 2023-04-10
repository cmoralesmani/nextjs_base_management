// src/hooks/user/useUsers.jsx

import { userService } from "src/services";

import { useDataList } from "../useDataList";

export function useUsers() {
  const {
    data: users,
    isLoading,
    error,
    setDataCallback: setUsersCallback,
  } = useDataList({ dataCallback: userService.getUsers });

  return { users, isLoading, error, setUsersCallback };
}
