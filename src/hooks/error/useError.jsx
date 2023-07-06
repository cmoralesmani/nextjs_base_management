import { useEffect, useState } from 'react'

import { toastService } from 'src/services'

export function useError () {
  const [error, setError] = useState()

  useEffect(() => {
    if (error) {
      toastService.error(error, { keepAfterRouteChange: true })
    }
  }, [error])

  return [error, setError]
}
