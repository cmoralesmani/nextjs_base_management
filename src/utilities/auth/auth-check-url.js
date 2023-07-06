import { authService } from 'src/services'
import { PUBLIC_PATHS } from './types.d'

export function authCheckUrl (url) {
  // Redirecciona a la pagina de Login si se accede a una pagina privada y no esta logeado
  const path = url.split('?')[0]

  const { authSubject } = authService
  if (!authSubject.value && !PUBLIC_PATHS.includes(path)) {
    return false
  } else {
    return true
  }
}
