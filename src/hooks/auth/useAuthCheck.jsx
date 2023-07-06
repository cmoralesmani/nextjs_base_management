import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { utilitiesAuth } from 'src/utilities'

const { authCheckUrl } = utilitiesAuth

export function useAuthCheck () {
  const [authorized, setAuthorized] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Se ejecuta la validacion en la carga inicial
    authCheck(router.asPath)

    // Se se subscriben a los eventos cuando inicia y se completa el cambio de rutas
    router.events.on('routeChangeStart', hideContent)
    router.events.on('routeChangeComplete', authCheck)

    // Se quita la subscripcion de los eventos antes puestos
    return () => {
      router.events.off('routeChangeStart', hideContent)
      router.events.off('routeChangeComplete', authCheck)
    }
  }, [])

  const authCheck = (url) => {
    const urlValid = authCheckUrl(url)
    setAuthorized(urlValid)

    if (!urlValid) {
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      })
    }
  }

  // Pone authorized en false para ocultar el contenido de la página mientras cambia las rutas
  const hideContent = () => setAuthorized(false)

  return { authorized, hideContent: !authorized }
}
