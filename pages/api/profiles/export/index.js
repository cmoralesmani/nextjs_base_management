// pages/api/profiles/export/index.js

import listProfilesCore from "src/api/profiles";
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
    const hasPermissionToExportProfiles = hasPermission(
      await hasPermissionsTo(req.user.username, ["PERFI-EXPOR"]),
      "PERFI-EXPOR"
    );
    if (!hasPermissionToExportProfiles) {
      return res
        .status(403)
        .json({ message: "No posee los permisos para exportar los perfiles" });
    }

    const dataProfiles = await listProfilesCore(req, res);

    const fields = [
      {
        label: "Perfil",
        value: "DE_PERFIL",
      },
      {
        label: "Estado",
        value: "BMAUTH_DEFINICION_D.DE_DEFINICION_D",
      },
    ];
    return downloadResource(res, "lista_perfiles.csv", fields, dataProfiles);
  }
}
