import { hasPermissionsTo } from 'src/helpers/api'
import { isJsonString } from 'src/helpers/api/util'
import { hasPermission } from 'src/helpers/utils'

const { Op } = require('sequelize')
const db = require('@db/models/index')

const parametersList = async (req, res) => {
  const hasPermissionToListParameters = hasPermission(
    await hasPermissionsTo(req.user.username, ['see_parameters']),
    'see_parameters'
  )
  if (!hasPermissionToListParameters) {
    return res
      .status(403)
      .json({ message: 'No posee los permisos para listar parametros' })
  }

  /** Valoraciones a considerar para los filtros especificados en el request */
  const filtersStr = req.query?.filters || '{}'
  if (!filtersStr) throw new Error('filters: No especificó los filtros')
  const { isJson, jsonValue: filters } = isJsonString(filtersStr)
  if (!isJson) throw new Error('filters: No especificó un JSON válido')

  const buildWhere = {}
  if (filters?.search) {
    buildWhere.DE_DEFINITION_MASTER = db.sequelize.where(
      db.sequelize.fn('lower', db.sequelize.col('DE_DEFINITION_MASTER')),
      { [Op.substring]: filters?.search.toLowerCase() }
    )
  }

  const dataParameters = await db.bmauth_definition_master.findAll({
    where: buildWhere,
    order: [['DE_DEFINITION_MASTER', 'ASC']]
  })

  return dataParameters
}

export default parametersList
