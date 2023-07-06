import { useCallback, useEffect, useState } from 'react'

import { useError } from 'src/hooks/error'
import { useIsMounted } from 'src/hooks/resources'

function useDataList ({
  loadInitialData = true,
  sourceDataCallback,
  controllerRequestAPI
}) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useError(null)
  const signal = controllerRequestAPI?.signal

  const isMounted = useIsMounted()

  const loadDataCallback = useCallback(async (filters) => {
    setIsLoading(true)
    setData(null)

    const options = {
      signal
    }
    return sourceDataCallback({ filters, options })
      .then((response) => isMounted() && setData(response))
      .catch((error) => isMounted() && setError(error))
      .finally(() => isMounted() && setIsLoading(false))
  }, [])

  useEffect(() => {
    if (loadInitialData) loadDataCallback()
  }, [])

  return {
    data,
    setData,
    isLoading,
    error,
    loadDataCallback,
    controllerRequestAPI
  }
}

export { useDataList }
