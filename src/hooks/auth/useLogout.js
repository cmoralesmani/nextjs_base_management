import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserState } from 'src/redux/slices/user-slice'

import { authService } from 'src/services'

export function useLogout () {
  const disptach = useDispatch()
  useEffect(() => {
    disptach(setUserState(null))
    authService.logout()
  })
}
