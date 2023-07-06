import { useEffect, useState } from 'react'

import { useError } from 'src/hooks/error'
import { useIsMounted } from 'src/hooks/resources'
import { profileService } from 'src/services'

export function useProfile ({ id, controllerRequestAPI }) {
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useError()

  const isMounted = useIsMounted()

  useEffect(() => {
    setIsLoading(true)

    if (id) {
      const options = {
        signal: controllerRequestAPI?.signal
      }

      profileService
        .getById(id, options)
        .then((response) => isMounted() && setProfile(response))
        .catch((error) => isMounted() && setError(error))
        .finally(() => isMounted() && setIsLoading(false))
    }
  }, [isMounted, id])

  return { profile, isLoading, error }
}
