import { useEffect, useState } from 'react'

import { parametersService, toastService } from 'src/services'

import { useIsMounted } from 'src/hooks/resources'

export function useParameter ({ id, controllerRequestAPI }) {
  const [parameter, setParameter] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const isMounted = useIsMounted()

  useEffect(() => {
    if (error) {
      toastService.error(error?.message, { keepAfterRouteChange: true })
    }
  }, [error])

  useEffect(() => {
    setIsLoading(true)
    if (id) {
      const options = {
        signal: controllerRequestAPI?.signal
      }
      parametersService
        .getById(id, options)
        .then((response) => isMounted() && setParameter(response))
        .catch((error) => isMounted() && setError(error))
        .finally(() => isMounted() && setIsLoading(false))
    }
  }, [isMounted, id])

  return { parameter, isLoading, error }
}
