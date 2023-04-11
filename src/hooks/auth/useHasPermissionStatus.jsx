// src/hooks/auth/useHasPermissionStatus.jsx

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectUserState } from "src/redux/slices/user-slice";

export function useHasPermissionStatus({ codenamePermission, callback }) {
  const [hasPermission, setHasPermission] = useState(null);
  const userState = useSelector(selectUserState);

  useEffect(() => {
    if (!!userState) {
      const { id_user, user_permissions } = userState;
      const permissionFiltered = user_permissions?.filter(
        (permission) => permission.codename === codenamePermission
      );
      setHasPermission((permissionFiltered || []).length > 0);
      if (callback) callback({ id_user, setHasPermission });
    }
  }, [userState, codenamePermission, callback]);

  return hasPermission;
}
