import { apiHandler, hasPermissionsTo, thereIsAnyAdmin } from 'src/helpers/api'
import { hasPermission } from 'src/helpers/utils'
const db = require('@db/models/index')

export default apiHandler(handler)

function handler (req, res) {
  switch (req.method) {
    case 'DELETE':
      return _delete()
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function _delete () {
    const { id_profile: idProfile } = req.query

    // Tiene permiso para eliminar perfiles?
    const hasPermissionToDeleteProfile = hasPermission(
      await hasPermissionsTo(req.user.username, ['delete_profile']),
      'delete_profile'
    )
    if (!hasPermissionToDeleteProfile) {
      return res
        .status(403)
        .json({ message: 'No tiene permiso para eliminar perfil' })
    }

    // Verificacion de que haya especificado el perfil que quiere eliminar
    if (!idProfile) {
      throw new Error('No especificó el perfil que desea eliminar')
    }

    let transaction
    try {
      transaction = await db.sequelize.transaction()
      const profile = await db.bmauth_profile.findOne(
        {
          where: { ID_PROFILE: idProfile }
        },
        { transaction }
      )

      /* Verificacion de si existe el perfil que esta tratando de eliminar */
      if (!profile) {
        throw new Error('El perfil no existe')
      }

      await profile.destroy({ transaction })

      // Antes de hacer commit por la operacion realizada se verifica si queda algun administrador
      const thereIsAnyAdminNow = await thereIsAnyAdmin(transaction)
      if (!thereIsAnyAdminNow) {
        throw new Error('La operación que desea realizar deja al perfil de Super Administrador sin ningún usuario asignado')
      }

      await transaction.commit()
      return res.status(200).json({})
    } catch (error) {
      await transaction.rollback()
      throw new Error('No se pudo eliminar el perfil (No debe tener usuarios y permisos asignados)')
    }
  }
}
