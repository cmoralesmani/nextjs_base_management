// src/hooks/profile/useProfiles.js

import { useCallback, useEffect, useState } from "react";

import { toastService } from "src/services";
import { useIsMounted } from ".";

export function useDataList({ sourceDataCallback }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isMounted = useIsMounted();

  useEffect(() => {
    if (error) {
      toastService.error(error?.message, { keepAfterRouteChange: true });
    }
  }, [error]);

  const loadDataCallback = useCallback(
    (filters) => {
      setIsLoading(true);
      return sourceDataCallback(filters)
        .then((response) => isMounted() && setData(response))
        .catch((error) => isMounted() && setError(error))
        .finally(() => isMounted() && setIsLoading(false));
    },
    [sourceDataCallback, isMounted]
  );

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  return { data, isLoading, error, loadDataCallback };
}
