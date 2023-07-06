import { ListSection } from 'src/components/shared/sections'
import { useHasPermissionStatus } from 'src/hooks/auth'

export function UsersSection ({ users }) {
  const hasPermissionViewUser = useHasPermissionStatus({
    codenamePermission: 'see_single_user'
  })

  const items = (users || []).map((user) => ({
    key: user.id_user,
    description: user.username,
    link: hasPermissionViewUser
      ? { href: `/accessibility/users/details/${user.id_user}` }
      : undefined
  }))

  return (
    <ListSection
      title="Usuarios"
      items={items}
      textEmpty="No tiene usuarios asignados"
    />
  )
}
