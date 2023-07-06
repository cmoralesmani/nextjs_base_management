import listPermissionsCore from 'src/api/accessibility/permissions'
import { apiHandler } from 'src/helpers/api'

export default apiHandler(handler)

function handler (req, res) {
  switch (req.method) {
    case 'GET':
      return get()
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function get () {
    const dataPermissionsCoreAsJSON = await listPermissionsCore(req, res)
    const dataPermissions = dataPermissionsCoreAsJSON.map((p) => ({
      id_permission: p.ID_PERMISSION,
      de_permission: p.DE_PERMISSION
    }))

    return res.status(200).json(dataPermissions)
  }
}
