// src/hooks/profile/useProfiles.js

import { useCallback, useEffect, useState } from "react";

import { profileService, toastService } from "src/services";
import { useIsMounted } from "..";

export function useProfiles() {
  const [profiles, setProfiles] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const isMounted = useIsMounted();

  useEffect(() => {
    if (error) {
      toastService.error(error?.message, { keepAfterRouteChange: true });
    }
  }, [error]);

  const getProfiles = useCallback((filters = undefined) => {
    setIsLoading(true);
    return profileService
      .getProfiles(filters)
      .then((response) => isMounted() && setProfiles(response))
      .catch((error) => isMounted() && setError(error))
      .finally(() => isMounted() && setIsLoading(false));
  }, []);

  useEffect(() => {
    getProfiles();
  }, []);

  function setProfilesCallback(filters) {
    return getProfiles(filters);
  }

  return { profiles, isLoading, error, setProfilesCallback };
}
