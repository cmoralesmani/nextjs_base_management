import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectUserState } from 'src/redux/slices/user-slice'

export function useHasPermissionStatus ({ codenamePermission }) {
  const [hasPermission, setHasPermission] = useState(null)
  const userState = useSelector(selectUserState)

  useEffect(() => {
    if (userState) {
      const { user_permissions: userPermissions } = userState
      const permissionFiltered = userPermissions.filter(
        (permission) => permission.codename === codenamePermission
      )
      setHasPermission(permissionFiltered.length > 0)
    }
  }, [userState])

  return hasPermission
}
