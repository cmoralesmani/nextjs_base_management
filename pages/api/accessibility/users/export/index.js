import listUsersCore from 'src/api/accessibility/users'
import { apiHandler, hasPermissionsTo } from 'src/helpers/api'
import { downloadResource } from 'src/helpers/api/util'
import { hasPermission } from 'src/helpers/utils'

const { map } = require('lodash')

export default apiHandler(handler)

function handler (req, res) {
  switch (req.method) {
    case 'GET':
      return get()
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function get () {
    const hasPermissionToExportUsers = hasPermission(
      await hasPermissionsTo(req.user.username, ['export_users']),
      'export_users'
    )

    if (!hasPermissionToExportUsers) {
      return res.status(403).json({
        message: 'No posee los permisos para exportar las cuentas de usuarios'
      })
    }

    const dataUsers = await listUsersCore(req, res)

    map(dataUsers, (u) => {
      u.de_es_activo = u.DEF_STATUS_USER.DE_DEFINITION_DETAIL
    })

    const fields = [
      {
        label: 'Nombre de usuario',
        value: 'USERNAME'
      },
      {
        label: 'Nombre',
        value: 'NAME_USER'
      },
      {
        label: 'Apellido',
        value: 'LASTNAME_USER'
      },
      {
        label: 'Estado',
        value: 'de_es_activo'
      }
    ]
    return downloadResource(res, 'users.csv', fields, dataUsers)
  }
}
