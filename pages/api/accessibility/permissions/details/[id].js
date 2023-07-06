import { apiHandler, hasPermissionsTo } from 'src/helpers/api'
import { hasPermission } from 'src/helpers/utils'
const db = require('@db/models/index')

export default apiHandler(handler)

function handler (req, res) {
  switch (req.method) {
    case 'GET':
      return get()
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function get () {
    const { id } = req.query

    if (!id) {
      throw new Error('No especificó el permiso que desea ver')
    }

    // Tiene permiso para ver el detalle del peermiso?
    const hasPermissionToSeeDetailPermission = hasPermission(
      await hasPermissionsTo(req.user.username, ['see_single_permission']),
      'see_single_permission'
    )
    if (!hasPermissionToSeeDetailPermission) {
      return res
        .status(403)
        .json({ message: 'No tiene permiso para ver detalle del permiso' })
    }

    // Se obtiene el detalle del permiso
    const permission = await db.bmauth_permission.findOne({
      where: { ID_PERMISSION: id },
      include: [
        {
          model: db.bmauth_profile_permissions,
          required: false,
          include: [
            {
              model: db.bmauth_profile,
              required: true
            }
          ]
        },
        {
          model: db.bmauth_user_permissions,
          required: false,
          include: [
            {
              model: db.bmauth_user,
              required: true
            }
          ]
        }
      ]
    })

    /* Verficacion de si existe el permiso */
    if (!permission) {
      throw new Error('El permiso no existe')
    }

    // Obtencion perfiles que tienen el permiso consultado
    const profilesOfPermission = permission.BMAUTH_PROFILE_PERMISSIONs.map(
      (p) => ({
        id_profile: p.BMAUTH_PROFILE.ID_PROFILE,
        de_profile: p.BMAUTH_PROFILE.DE_PROFILE
      })
    )
    const profilesSelected = profilesOfPermission.map((p) => p.id_profile)

    // Obtencion de los usuarios que tiene el permiso consultado
    const usersOfPermission = permission.BMAUTH_USER_PERMISSIONs.map((u) => ({
      id_user: u.BMAUTH_USER.ID_USER,
      username: u.BMAUTH_USER.USERNAME,
      name_user: u.BMAUTH_USER.NAME_USER,
      lastname_user: u.BMAUTH_USER.LASTNAME_USER
    }))

    const usersSelected = usersOfPermission.map((u) => u.id_user)

    return res.status(200).json({
      id_permission: permission.ID_PERMISSION,
      de_permission: permission.DE_PERMISSION,
      profiles: profilesOfPermission,
      profiles_selected: profilesSelected,
      users: usersOfPermission,
      users_selected: usersSelected
    })
  }
}
