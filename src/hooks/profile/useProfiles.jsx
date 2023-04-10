// src/hooks/profile/useProfiles.js

import { profileService } from "src/services";

import { useDataList } from "../useDataList";

export function useProfiles() {
  const {
    data: profiles,
    isLoading,
    error,
    setDataCallback: setProfilesCallback,
  } = useDataList({ dataCallback: profileService.getProfiles });

  return { profiles, isLoading, error, setProfilesCallback };
}
