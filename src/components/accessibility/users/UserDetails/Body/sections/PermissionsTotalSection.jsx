import { ListSection } from 'src/components/shared/sections'

import { useHasPermissionStatus } from 'src/hooks/auth'

export function PermissionsTotalSection ({ permissions }) {
  const hasPermissionViewPermission = useHasPermissionStatus({
    codenamePermission: 'see_single_permission'
  })

  const items = permissions.map((permission) => ({
    key: permission.codename,
    description: permission.de_permission,
    link: hasPermissionViewPermission
      ? {
          href: `/accessibility/permissions/details/${permission.codename}`
        }
      : undefined
  }))

  return (
    <ListSection
      title="Permisos adquiridos"
      items={items}
      textEmpty="No tiene permisos asignados"
    />
  )
}
