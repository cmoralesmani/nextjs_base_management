import listPermissionsCore from "src/api/accessibility/permissions";
import { apiHandler, hasPermissionsTo } from "src/helpers/api";
import { downloadResource } from "src/helpers/api/util";
import { hasPermission } from "src/helpers/utils";

export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "GET":
      return get();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function get() {
    const hasPermissionToExportPermissions = hasPermission(
      await hasPermissionsTo(req.user.username, ["export_permissions"]),
      "export_permissions"
    );
    if (!hasPermissionToExportPermissions) {
      return res
        .status(403)
        .json({ message: "No posee los permisos para exportar los permisos" });
    }

    const dataPermissionsCoreAsJSON = await listPermissionsCore(req, res);

    const fields = [
      {
        label: "Permiso",
        value: "DE_PERMISSION",
      },
    ];
    return downloadResource(
      res,
      "permissions.csv",
      fields,
      dataPermissionsCoreAsJSON
    );
  }
}
