import { check, validationResult } from "express-validator";

const moment = require("moment");

import {
  apiHandler,
  hasPermissionsTo,
  initMiddleware,
  validateMiddleware,
} from "src/helpers/api";
import { hasPermission } from "src/helpers/utils";

const db = require("@db/models/index");

const validateBody = initMiddleware(
  validateMiddleware(
    [
      check("de_definicion_m")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Descripción no válida"),
      check("obj_definicion_d")
        .isArray()
        .withMessage("Detalle de parametros no válidos"),
    ],
    validationResult
  )
);

export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "PUT":
      return put();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function put() {
    const { id_parameter } = req.query;
    const data = req.body;
    let objs = [];
    // Tiene permiso para editar empresa?
    const hasPermissionToEditParameter = hasPermission(
      await hasPermissionsTo(req.user.username, ["alter_parameter"]),
      "alter_parameter"
    );

    const obj_definicion_d = req.body?.obj_definicion_d || [];

    if (!hasPermissionToEditParameter) {
      return res
        .status(403)
        .json({ message: "No tiene permiso para editar parametro" });
    }

    // Verificacion de que haya especificado el parametro que quiere editar
    if (!id_parameter) {
      throw "No especificó el parametro que desea editar";
    }

    for (let i in obj_definicion_d) {
      if (!obj_definicion_d[i].descripcion_definicion_d) {
        throw (
          "El campo de descripcion  no puede estar vacio en el parametro :" +
          obj_definicion_d[i].id_definicion_d
        );
      }
      objs.push(obj_definicion_d[i]);
    }

    let transaction;
    try {
      transaction = await db.sequelize.transaction();

      const parameter = await db.bmauth_definition_master.findOne(
        {
          where: { ID_DEFINITION_MASTER: id_parameter },
        },
        { transaction }
      );

      /* Verificacion de si existe el dato que esta tratando de editar */
      if (!parameter) {
        throw "No se encontro el parametro";
      }

      // Validacion de formulario
      await validateBody(req, res);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      // Se establecen los nuevos valores
      parameter.MODIFIED_AT = moment().format("YYYY-MM-DD HH:mm:ss");
      parameter.MODIFIED_BY = req.user.username;
      parameter.MODIFIED_IN = "API_WEB_TP";
      parameter.DE_DEFINITION_MASTER = data.de_definicion_m;
      await parameter.save({ transaction });

      for (let i = 0; i < objs.length; i++) {
        await db.bmauth_definition_detail.update(
          {
            DE_DEFINITION_DETAIL: objs[i]["descripcion_definicion_d"],
          },
          {
            where: { ID_DEFINITION_DETAIL: objs[i]["id_definicion_d"] },
          },
          { transaction }
        );
      }

      await transaction.commit();
      return res.status(200).json({});
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
