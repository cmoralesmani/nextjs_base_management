import { useEffect, useState } from 'react'

import { useError } from 'src/hooks/error'
import { useIsMounted } from 'src/hooks/resources'
import { permissionService } from 'src/services'

export function usePermission ({ id, controllerRequestAPI }) {
  const [permission, setPermission] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useError()

  const isMounted = useIsMounted()

  useEffect(() => {
    setIsLoading(true)
    if (id) {
      const options = {
        signal: controllerRequestAPI?.signal
      }
      permissionService
        .getById(id, options)
        .then((response) => isMounted() && setPermission(response))
        .catch((error) => isMounted() && setError(error))
        .finally(() => isMounted() && setIsLoading(false))
    }
  }, [isMounted, id])

  return { permission, isLoading, error }
}
