import PropTypes from "prop-types";

import { useDataList } from "src/hooks/resources";
import { profileService, toastService } from "src/services";

export function useProfiles({ loadInitialData = true, controllerRequestAPI }) {
  const {
    data: profiles,
    setData: setProfiles,
    isLoading,
    error,
    loadDataCallback: loadProfilesCallback,
  } = useDataList({
    loadInitialData: loadInitialData,
    sourceDataCallback: profileService.getProfiles,
    controllerRequestAPI: controllerRequestAPI,
  });

  function deleteProfileCallback(id) {
    return profileService.delete(id).then(() => {
      const timer = setTimeout(() => {
        setProfiles((profiles) => profiles.filter((x) => x.id_profile !== id));
      });

      toastService.success("Se eliminó correctamente el perfil");
      return () => {
        clearTimeout(timer);
      };
    });
  }

  return {
    profiles,
    isLoading,
    error,
    loadProfilesCallback,
    deleteProfileCallback,
  };
}
