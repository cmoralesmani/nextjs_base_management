import { ListSection } from 'src/components/shared/sections'
import { useHasPermissionStatus } from 'src/hooks/auth'

export function PermissionsSection ({ permissions }) {
  const hasPermissionViewPermission = useHasPermissionStatus({
    codenamePermission: 'see_single_permission'
  })

  const items = (permissions || []).map((permission) => ({
    key: permission.id_permission, // Para el key no lleve el 0, porque no es reconocido como valor valido para ListSection
    description: permission.de_permission,
    link: hasPermissionViewPermission
      ? {
          href: `/accessibility/permissions/details/${permission.id_permission}`
        }
      : undefined
  }))

  return (
    <ListSection
      title="Permisos"
      items={items}
      textEmpty="No tiene permisos asignados"
    />
  )
}
