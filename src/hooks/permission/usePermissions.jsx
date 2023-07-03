import { useDataList } from "src/hooks/resources";
import { permissionService } from "src/services";

export function usePermissions({
  loadInitialData = true,
  controllerRequestAPI,
}) {
  const {
    data: permissions,
    isLoading,
    error,
    loadDataCallback: loadPermissionsCallback,
  } = useDataList({
    loadInitialData: loadInitialData,
    sourceDataCallback: permissionService.getPermissions,
    controllerRequestAPI: controllerRequestAPI,
  });

  return {
    permissions,
    isLoading,
    error,
    loadPermissionsCallback,
  };
}
