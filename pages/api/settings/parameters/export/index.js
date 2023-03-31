// pages/api/settings/parameters/export/index.js

import listParametersCore from "src/api/settings/parameters";
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
    const hasPermissionToExportParameters = hasPermission(
      await hasPermissionsTo(req.user.username, ["export_parameters"]),
      "export_parameters"
    );
    if (!hasPermissionToExportParameters) {
      return res.status(403).json({
        message: "No posee los permisos para exportar los parametros",
      });
    }

    const dataParameters = await listParametersCore(req, res);

    const fields = [
      {
        label: "Parametro",
        value: "DE_DEFINITION_MASTER",
      },
    ];

    return downloadResource(
      res,
      "lista_parametros.csv",
      fields,
      dataParameters
    );
  }
}
