// pages/api/settings/parameters/details/[id_parameter].js

import { apiHandler, hasPermissionsTo } from "@app/helpers/api";
import { hasPermission } from "@app/helpers/utils";
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
      await hasPermissionsTo(req.user.username, ["PARAM-VER"]),
      "PARAM-VER"
    );
    if (!hasPermissionToSeeDetailParameter) {
      return res
        .status(403)
        .json({ message: "No tiene permiso para ver detalle de parametro" });
    }

    let buildWhere = {
      ID_DEFINICION_M: id_parameter,
    };

    // En caso de poseer el permiso retorna los datos del parametro
    const parameter = await db.bmauth_definicion_m.findOne({
      where: buildWhere,
      include: [
        {
          model: db.bmauth_definicion_d,
          required: false,
          where: buildWhere,
        },
      ],
    });

    const objDefinicionD = parameter.BMAUTH_DEFINICION_Ds.map((p) => ({
      id_definicion_d: p.ID_DEFINICION_D,
      descripcion_definicion_d: p.DE_DEFINICION_D,
      comentario_definicion_d: p.CM_DEFINICION_D,
    }));

    /* Verificacion de que si existe la empresa que estan solicitando */
    if (!parameter) {
      throw "No se encontro el parametro";
    }

    return res.status(200).json({
      parametro: {
        id_definicion_m: parameter.ID_DEFINICION_M,
        de_definicion_m: parameter.DE_DEFINICION_M,
        obj_definicion_d: objDefinicionD,
      },
    });
  }
}
