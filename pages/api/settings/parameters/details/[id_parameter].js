// pages/api/settings/parameters/details/[id_parameter].js

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
    const { id_parameter } = req.query;

    if (!id_parameter) {
      throw "No especificó el parametro que desea ver";
    }

    // Tiene permiso para ver el detalle de empresas?
    const hasPermissionToSeeDetailParameter = hasPermission(
      await hasPermissionsTo(req.user.username, ["see_single_parameter"]),
      "see_single_parameter"
    );
    if (!hasPermissionToSeeDetailParameter) {
      return res
        .status(403)
        .json({ message: "No tiene permiso para ver detalle de parametro" });
    }

    let buildWhere = {
      ID_DEFINITION_MASTER: id_parameter,
    };

    // En caso de poseer el permiso retorna los datos del parametro
    const parameter = await db.bmauth_definition_master.findOne({
      where: buildWhere,
      include: [
        {
          model: db.bmauth_definition_detail,
          required: false,
          where: buildWhere,
        },
      ],
    });

    const objDefinicionD = parameter.BMAUTH_DEFINITION_DETAILs.map((p) => ({
      id_definicion_d: p.ID_DEFINITION_DETAIL,
      descripcion_definicion_d: p.DE_DEFINITION_DETAIL,
      comentario_definicion_d: p.COMMENT_DEFINITION_DETAIL,
    }));

    /* Verificacion de que si existe la empresa que estan solicitando */
    if (!parameter) {
      throw "No se encontro el parametro";
    }

    return res.status(200).json({
      parametro: {
        id_definicion_m: parameter.ID_DEFINITION_MASTER,
        de_definicion_m: parameter.DE_DEFINITION_MASTER,
        obj_definicion_d: objDefinicionD,
      },
    });
  }
}
