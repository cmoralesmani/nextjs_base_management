// src/hooks/profile/useProfiles.js

import { profileService } from "src/services";

import { useDataList } from "../useDataList";

export function useProfiles() {
  const {
    data: profiles,
    isLoading,
    error,
    loadDataCallback: loadProfilesCallback,
  } = useDataList({ sourceDataCallback: profileService.getProfiles });

  return { profiles, isLoading, error, loadProfilesCallback };
}
