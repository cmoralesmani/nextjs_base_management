import { hasPermissionsTo } from 'src/helpers/api'
import { isJsonString } from 'src/helpers/api/util'
import { hasPermission } from 'src/helpers/utils'

const { Op } = require('sequelize')
const db = require('@db/models/index')

const usersList = async (req, res) => {
  const hasPermissionToListUser = hasPermission(
    await hasPermissionsTo(req.user.username, ['see_users']),
    'see_users'
  )
  if (!hasPermissionToListUser) {
    return res
      .status(403)
      .json({ message: 'No posee los permisos para listar usuarios' })
  }

  /** Valoraciones a considerar para los filtros especificados en el request */
  const filtersStr = req.query?.filters || '{}'
  if (!filtersStr) throw new Error('filters: No especificó los filtros')
  const { isJson, jsonValue: filters } = isJsonString(filtersStr)
  if (!isJson) throw new Error('filters: No especificó un JSON válido')

  // Obtencion de la lista de usuarios
  const buildWhere = {}
  if (filters?.search) {
    buildWhere.USERNAME = {
      [Op.and]: filters?.search
        .toLowerCase()
        .split(' ')
        .map((w) => {
          return db.sequelize.where(
            db.sequelize.fn(
              'lower',
              db.sequelize.literal('USERNAME || NAME_USER || LASTNAME_USER')
            ),
            {
              [Op.substring]: w
            }
          )
        })
    }
  }
  if (filters?.sex_user) buildWhere.GENDER_USER_ID = filters.sex_user

  const dataUsersDB = await db.bmauth_user.findAll({
    where: buildWhere,
    include: [
      {
        model: db.bmauth_definition_detail,
        required: true,
        as: 'DEF_STATUS_USER'
      },
      {
        model: db.bmauth_definition_detail,
        required: true,
        as: 'DEF_GENDER_USER'
      }
    ]
  })

  const dataUsers = JSON.parse(JSON.stringify(dataUsersDB))

  return dataUsers
}

export default usersList
