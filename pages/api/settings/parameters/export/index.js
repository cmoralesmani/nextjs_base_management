// pages/api/settings/parameters/export/index.js

import listParametersCore from "@app/api/settings/parameters";
import { apiHandler, hasPermissionsTo } from "@app/helpers/api";
import { downloadResource } from "@app/helpers/api/util";
import { hasPermission } from "@app/helpers/utils";

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
      await hasPermissionsTo(req.user.username, ["PARAM-EXPOR"]),
      "PARAM-EXPOR"
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
        value: "DE_DEFINICION_M",
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
