// pages/api/accounts/export/index.js

const { map } = require("lodash");

import listUsersCore from "@app/api/accounts";
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
    const hasPermissionToExportUsers = hasPermission(
      await hasPermissionsTo(req.user.username, ["CUEUS-EXPOR"]),
      "CUEUS-EXPOR"
    );

    if (!hasPermissionToExportUsers) {
      return res.status(403).json({
        message: "No posee los permisos para exportar las cuentas de usuarios",
      });
    }

    const dataUsers = await listUsersCore(req, res);

    map(dataUsers, (u) => {
      u.de_es_activo = u.DEF_ES_USUARIO.DE_DEFINICION_D;
    });

    const fields = [
      {
        label: "Nombre de usuario",
        value: "USERNAME",
      },
      {
        label: "Nombre",
        value: "NOM_USUARIO",
      },
      {
        label: "Apellido",
        value: "APE_USUARIO",
      },
      {
        label: "Estado",
        value: "de_es_activo",
      },
    ];
    return downloadResource(res, "lista_usuarios.csv", fields, dataUsers);
  }
}