// pages/api/profiles/create/index.js

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
      check("id_perfil")
        .trim()
        .isLength({ min: 3, max: 5 })
        .withMessage("Id de perfil invalido longitud maxima 5")
        .custom(async (id_perfil) => {
          //busca en la base para verificar que el nuevo perfil ingresado no existe
          const profile = await db.bmauth_profile.findOne({
            where: { ID_PROFILE: id_perfil },
          });

          if (profile) throw new Error("El id del perfil ya existe");

          return true;
        }),
      check("de_perfil")
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage("Nombre invalido"),
    ],
    validationResult
  )
);

export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "POST":
      return post();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function post() {
    const data = req.body;

    const permissions = await hasPermissionsTo(req.user.username, [
      "create_profile",
      "see_users",
      "see_permissions",
    ]);
    const hasPermissionToCreateProfile = hasPermission(
      permissions,
      "create_profile"
    );
    if (!hasPermissionToCreateProfile) {
      return res
        .status(403)
        .json({ message: "No tiene permiso para crear perfil" });
    }

    const hasPermissionToShowUsers = hasPermission(permissions, "see_users");
    const hasPermissionToShowPermissions = hasPermission(
      permissions,
      "see_permissions"
    );

    // Validacion de formulario
    await validateBody(req, res);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let transaction;
    try {
      transaction = await db.sequelize.transaction();

      // Se establecen los valores en un objeto
      const newData = {
        CREATED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
        CREATED_BY: req.user.username,
        CREATED_IN: "API_WEB_TP",
        MODIFIED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
        MODIFIED_BY: req.user.username,
        MODIFIED_IN: "API_WEB_TP",
        ID_PROFILE: data.id_perfil,
        DE_PROFILE: data.de_perfil,
        STATUS_PROFILE_ID: data.es_perfil,
      };
      // instruccion para crear un nuevo registro con los datos ingresados
      const dataReceived = await db.bmauth_profile.create(newData, {
        transaction,
      });

      if (hasPermissionToShowUsers) {
        if (data.usuarios_seleccionados?.length) {
          const list_users_permission = data.usuarios_seleccionados.map(
            (p) => ({
              CREATED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
              CREATED_BY: req.user.username,
              CREATED_IN: "API_WEB_TP",
              MODIFIED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
              MODIFIED_BY: req.user.username,
              MODIFIED_IN: "API_WEB_TP",
              ID_USER: p,
              ID_PROFILE: dataReceived.ID_PROFILE,
            })
          );
          await db.bmauth_user_profiles.bulkCreate(list_users_permission, {
            transaction,
          });
        }
      }

      if (hasPermissionToShowPermissions) {
        if (data.permisos_seleccionados?.length) {
          const list_profile_permission = data.permisos_seleccionados.map(
            (p) => ({
              CREATED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
              CREATED_BY: req.user.username,
              CREATED_IN: "API_WEB_TP",
              MODIFIED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
              MODIFIED_BY: req.user.username,
              MODIFIED_IN: "API_WEB_TP",
              ID_PROFILE: dataReceived.ID_PROFILE,
              ID_PERMISSION: p,
            })
          );
          await db.bmauth_profile_permissions.bulkCreate(
            list_profile_permission,
            {
              transaction,
            }
          );
        }
      }

      await transaction.commit();
      return res.status(200).json({
        perfil: {
          id_perfil: dataReceived.ID_PROFILE,
          de_perfil: dataReceived.de_perfil,
        },
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
