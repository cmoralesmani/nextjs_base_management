// pages/api/permission/index.js

const { Op } = require("sequelize");

import { apiHandler, hasPermissionsTo } from "src/helpers/api";
import { hasPermission } from "src/helpers/utils";
const db = require("@db/models/index");

export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "GET":
      return get();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function get() {
    const hasPermissionToListPermission = hasPermission(
      await hasPermissionsTo(req.user.username, ["see_permissions"]),
      "see_permissions"
    );
    if (!hasPermissionToListPermission) {
      return res
        .status(403)
        .json({ message: "No tiene permisos para listar permisos" });
    }

    const { search } = req.query;

    // Obtencion de la lista de permisos
    const permissions = await db.bmauth_permission.findAll({
      where: {
        DE_PERMISSION: {
          [Op.substring]: search || "",
        },
      },
    });

    return res.status(200).json({
      permisos: permissions.map((p) => ({
        id_permission: p.ID_PERMISSION,
        de_permiso: p.DE_PERMISSION,
      })),
    });
  }
}
