import { hasPermissionsTo } from 'src/helpers/api'
import { isJsonString } from 'src/helpers/api/util'
import { hasPermission } from 'src/helpers/utils'

const { Op } = require('sequelize')
const db = require('@db/models/index')

const profilesList = async (req, res) => {
  const hasPermissionToListProfile = hasPermission(
    await hasPermissionsTo(req.user.username, ['see_profiles']),
    'see_profiles'
  )
  if (!hasPermissionToListProfile) {
    throw new Error('No tienes permiso para listar perfiles')
  }

  /** Valoraciones a considerar para los filtros especificados en el request */
  const filtersStr = req.query?.filters || '{}'
  if (!filtersStr) throw new Error('filters: No especificó los filtros')
  const { isJson, jsonValue: filters } = isJsonString(filtersStr)
  if (!isJson) throw new Error('filters: No especificó un JSON válido')

  // Obtencion de la lista de perfiles
  const buildWhere = {}
  if (filters?.search) {
    buildWhere.DE_PROFILE = db.sequelize.where(
      db.sequelize.fn('lower', db.sequelize.col('DE_PROFILE')),
      { [Op.substring]: filters.search.toLowerCase() }
    )
  }

  const dataProfiles = await db.bmauth_profile.findAll({
    where: buildWhere,
    include: [
      {
        attributes: ['DE_DEFINITION_DETAIL'],
        model: db.bmauth_definition_detail,
        required: true
      }
    ]
  })

  return dataProfiles
}

export default profilesList
