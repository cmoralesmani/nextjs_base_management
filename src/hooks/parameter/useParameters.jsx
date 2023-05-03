// src/hooks/profile/useProfiles.js

import { parametersService } from "src/services";

import { useDataList } from "../useDataList";

export function useParameters() {
  const {
    data: parameters,
    isLoading,
    error,
    loadDataCallback: loadParametersCallback,
  } = useDataList({ sourceDataCallback: parametersService.getParameters });

  return { parameters, isLoading, error, loadParametersCallback };
}
