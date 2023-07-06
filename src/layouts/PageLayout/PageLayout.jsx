import Error from 'next/error'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { useHasPermissionStatus } from 'src/hooks/auth'

export { PageLayout }

PageLayout.propTypes = {
  /**
   * Codigo del permiso
   */
  codenamePermission: PropTypes.string.isRequired,
  /**
   * Callback a ejecutarse despues de obtener el indicador para saber si tiene permiso o no.
   * El callback debe devolver un booleano que indica el permiso que se establecerá, obviando el resultante del código especificado.
   */
  callbackPosPermission: PropTypes.func
}

function PageLayout ({ children, codenamePermission, callbackPosPermission }) {
  const [hasPermission, setHasPermission] = useState()
  const _hasPermission = useHasPermissionStatus({ codenamePermission })

  useEffect(() => {
    if (_hasPermission != null) {
      if (!callbackPosPermission) {
        // No especificaron callback a ejecutarse
        setHasPermission(_hasPermission)
      } else {
        // Especificaron callback para ejecutarse
        const _posHasPermission = callbackPosPermission({
          hasPermission: _hasPermission
        })
        if (_posHasPermission !== undefined && _posHasPermission != null) { setHasPermission(_posHasPermission) } else {
          console.error('El callback no devolvió el estado del permiso')
          setHasPermission(_hasPermission)
        }
      }
    }
  }, [_hasPermission])

  if (hasPermission === undefined) return null

  return hasPermission ? children : <Error statusCode={403} />
}
