// src/hooks/useHasPermissionStatus.jsx

import { useState, useEffect } from "react";

import { userService, toastService } from "src/services";

export function useHasPermissionStatus(list_id_permission, callback) {
  const [permissions, setPermissions] = useState();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const permissionsResponse = await userService.hasPermissionsTo(
          list_id_permission
        );
        if (isMounted) {
          setPermissions(permissionsResponse);
        }

        if (callback) callback(setPermissions, permissionsResponse);
      } catch (error) {
        if (isMounted) {
          toastService.error(error.message);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return permissions;
}
