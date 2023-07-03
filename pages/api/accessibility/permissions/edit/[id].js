import { check, validationResult } from "express-validator";
const moment = require("moment");
import { Op } from "sequelize";

import {
  apiHandler,
  hasPermissionsTo,
  thereIsAnyAdmin,
  initMiddleware,
  validateMiddleware,
} from "src/helpers/api";
import { hasPermission } from "src/helpers/utils";
const db = require("@db/models/index");

const validateBody = initMiddleware(
  validateMiddleware(
    [
      check("de_permission")
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage("Nombre no válido"),
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
    const { id } = req.query;
    const data = req.body;

    const hasPermissions = await hasPermissionsTo(req.user.username, [
      "alter_permission",
    ]);
    // Tiene permiso para editar permiso?
    const hasPermissionToEditPermission = hasPermission(
      hasPermissions,
      "alter_permission"
    );
    if (!hasPermissionToEditPermission) {
      return res
        .status(403)
        .json({ message: "No tiene permiso para editar permiso" });
    }

    // Verificacion de que haya especificado el permiso que quiere editar
    if (!id) {
      throw "No especificó el permiso que desea editar";
    }

    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const permission = await db.bmauth_permission.findOne(
        {
          where: { ID_PERMISSION: id },
        },
        { transaction }
      );

      /* Verificacion de si existe el permiso que esta tratando de editar */
      if (!permission) {
        throw "El permiso no existe";
      }

      // Validacion de formulario
      await validateBody(req, res);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      // Se establecen los nuevos valores
      permission.MODIFIED_AT = moment().format("YYYY-MM-DD HH:mm:ss");
      permission.MODIFIED_BY = req.user.username;
      permission.MODIFIED_IN = "API_WEB_TP";
      permission.DE_PERMISSION = data.de_permission;
      await permission.save({ transaction });

      await transaction.commit();
      return res.status(200).json({
        id_permission: permission.ID_PERMISSION,
        de_permission: permission.DE_PERMISSION,
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
