// src/hooks/profile/useProfiles.js

import { parametersService } from "src/services";

import { useDataList } from "../useDataList";

export function useParameters() {
  const {
    data: parameters,
    isLoading,
    error,
    setDataCallback: setParametersCallback,
  } = useDataList({ dataCallback: parametersService.getParameters });

  return { parameters, isLoading, error, setParametersCallback };
}
