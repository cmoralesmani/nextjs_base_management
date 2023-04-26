// src/hooks/profile/useProfiles.js

import { useCallback, useEffect, useState } from "react";

import { toastService } from "src/services";
import { useIsMounted } from ".";

export function useDataList({ dataCallback }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isMounted = useIsMounted();

  useEffect(() => {
    if (error) {
      toastService.error(error?.message, { keepAfterRouteChange: true });
    }
  }, [error]);

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback((filters = undefined) => {
    setIsLoading(true);
    return dataCallback(filters)
      .then((response) => isMounted() && setData(response))
      .catch((error) => isMounted() && setError(error))
      .finally(() => isMounted() && setIsLoading(false));
  }, []);

  function setDataCallback(filters) {
    return getData(filters);
  }

  return { data, isLoading, error, setDataCallback };
}
