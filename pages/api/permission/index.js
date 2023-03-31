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
      include: [
        {
          model: db.bmauth_permission_grupo,
          as: "BMAUTH_A_G",
          required: true,
        },
        {
          model: db.bmauth_permission_accion,
          as: "BMAUTH_P_A",
          required: true,
        },
      ],
      order: [["BMAUTH_A_G", "DE_PERMISSION_GRUPO", "ASC"]],
    });

    return res.status(200).json({
      permisos: permissions.map((p) => ({
        id_permiso: p.ID_PERMISSION,
        de_permiso: p.DE_PERMISSION,
        id_permiso_grupo: p.ID_PERMISSION_GRUPO,
        id_permiso_accion: p.ID_PERMISSION_ACCION,
        de_permiso_grupo: p.BMAUTH_A_G.DE_PERMISSION_GRUPO,
        de_permiso_accion: p.BMAUTH_P_A.DE_PERMISSION_ACCION,
      })),
    });
  }
}
