// src/hooks/profile/useProfiles.js

import { useCallback, useEffect, useState } from "react";

import { toastService } from "src/services";
import { useIsMounted } from ".";

export function useDataList({ dataCallback }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const isMounted = useIsMounted();

  useEffect(() => {
    if (error) {
      toastService.error(error?.message, { keepAfterRouteChange: true });
    }
  }, [error]);

  const getData = useCallback(
    (filters = undefined) => {
      setIsLoading(true);
      return dataCallback(filters)
        .then((response) => isMounted() && setData(response))
        .catch((error) => isMounted() && setError(error))
        .finally(() => isMounted() && setIsLoading(false));
    },
    [dataCallback, isMounted]
  );

  useEffect(() => {
    getData();
  }, [getData]);

  function setDataCallback(filters) {
    return getData(filters);
  }

  return { data, isLoading, error, setDataCallback };
}
