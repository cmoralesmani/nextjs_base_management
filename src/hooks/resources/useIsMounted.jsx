// https://www.codemzy.com/blog/ismounted-hook-with-useeffect-reactjs

import { useCallback, useEffect, useRef } from 'react'

export function useIsMounted () {
  const isMounted = useRef(false) // desmontado por defecto

  useEffect(() => {
    isMounted.current = true // montado

    return () => {
      isMounted.current = false // desmontado
    }
  }, []) // se ejecuta una ven al montar el componente

  return useCallback(() => isMounted.current, []) // devuelve la funcion que revisa el estado de montado
}
