import { useEffect } from 'react'

import { PermissionsList } from 'src/components/accessibility/permissions'
import { usePermissions } from 'src/hooks/permission'
import { PageLayout } from 'src/layouts'

export default function ListPermissionsPage () {
  const controllerRequestAPI = new AbortController()
  useEffect(() => () => controllerRequestAPI.abort(), [])

  const { permissions, loadPermissionsCallback } = usePermissions({
    loadInitialData: false,
    controllerRequestAPI
  })

  return (
    <PageLayout codenamePermission="see_permissions">
      <PermissionsList
        permissions={permissions}
        loadPermissionsCallback={loadPermissionsCallback}
      />
    </PageLayout>
  )
}
