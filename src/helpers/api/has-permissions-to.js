const { Op } = require('sequelize')

const logger = require('src/services/logger.service')
const db = require('@db/models/index')

/**
 * @description
 * Verifica si el usuario pasado por parametro en <<username>>
 * tiene permiso para los Id de Permisos
 * especificados en la lista <<list_id_permission>>.
 * @param {string} username - Nombre de usuario
 * @param {array} listIdPermission - Lista de Id de Permisos
 * @returns {array} - Devuelve una lista objetos con los
 * permisos consultados con un indicador de existencia de permiso.
 * @throws {Error} - Si no se puede consultar la lista de permisos
 * @example
 * hasPermissionsTo("admin", ["CUEUS_LISTA", "CUEUS_CREAR"]);
 * // => [{id_permission: "CUEUS_LISTA", has_permission: true}, {id_permission: "CUEUS_CREAR", has_permission: true}]
 */
export async function hasPermissionsTo (username, listIdPermission) {
  if (!Array.isArray(listIdPermission)) { throw new Error('list_id_permission: No especificó una lista válida') }

  try {
    if (username && listIdPermission.length > 0) {
      const permitsBD = await db.bmauth_profile_permissions.findAll({
        attributes: ['PERMISSION_ID'],
        include: [
          {
            attributes: [],
            model: db.bmauth_profile,
            required: true,
            include: [
              {
                attributes: [],
                model: db.bmauth_user_profiles,
                required: true,
                include: [
                  {
                    attributes: [],
                    model: db.bmauth_user,
                    required: true,
                    where: {
                      USERNAME: username,
                      STATUS_USER_ID: 'ESCUS-ACTIV'
                    }
                  }
                ]
              }
            ],
            where: { STATUS_PROFILE_ID: 'ESPER-ACTIV' }
          }
        ],
        where: { PERMISSION_ID: { [Op.in]: listIdPermission } }
      })

      const permitsBDJSON = JSON.parse(JSON.stringify(permitsBD))
      const response = listIdPermission.map((permit) => ({
        id_permission: permit,
        has_permission: permitsBDJSON.some(
          (permitBD) => permitBD.PERMISSION_ID === permit
        )
      }))
      return response
    }

    return []
  } catch (error) {
    logger.error(
      `!hasPermissionsTo Verificando el permiso de un usuario: ${error}`
    )
    return []
  }
}
