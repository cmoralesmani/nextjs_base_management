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
      "see_users",
      "see_profiles",
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

    const hasPermissionToShowUsers = hasPermission(hasPermissions, "see_users");
    const hasPermissionToShowProfiles = hasPermission(
      hasPermissions,
      "see_profiles"
    );

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

      if (hasPermissionToShowProfiles) {
        await db.bmauth_profile_permissions.destroy({
          where: {
            PERMISSION_ID: permission.ID_PERMISSION,
            PROFILE_ID: {
              [Op.notIn]: data.profiles_selected,
            },
          },
          transaction,
        });

        const upCurrent = JSON.parse(
          JSON.stringify(
            await db.bmauth_profile_permissions.findAll(
              {
                attributes: ["PROFILE_ID"],
                where: {
                  PERMISSION_ID: permission.ID_PERMISSION,
                },
              },
              { transaction }
            )
          )
        ).map((x) => {
          return x.PROFILE_ID;
        });

        const filtered = data.profiles_selected.filter((x) => {
          return !upCurrent.includes(x);
        });

        if (filtered.length) {
          const list_profile_permissions = filtered.map((p) => ({
            CREATED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
            CREATED_BY: req.user.username,
            CREATED_IN: "API_WEB_TP",
            MODIFIED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
            MODIFIED_BY: req.user.username,
            MODIFIED_IN: "API_WEB_TP",
            PERMISSION_ID: permission.ID_PERMISSION,
            PROFILE_ID: p,
          }));
          await db.bmauth_profile_permissions.bulkCreate(
            list_profile_permissions,
            {
              transaction,
            }
          );
        }
      }

      if (hasPermissionToShowUsers) {
        await db.bmauth_user_permissions.destroy({
          where: {
            PERMISSION_ID: permission.ID_PERMISSION,
            USER_ID: {
              [Op.notIn]: data.users_selected,
            },
          },
          transaction,
        });

        const userPermissionCurrent = JSON.parse(
          JSON.stringify(
            await db.bmauth_user_permissions.findAll(
              {
                attributes: ["USER_ID"],
                where: {
                  PERMISSION_ID: permission.ID_PERMISSION,
                },
              },
              {
                transaction,
              }
            )
          )
        ).map((x) => {
          return x.USER_ID;
        });

        const filtered = data.users_selected.filter((x) => {
          return !userPermissionCurrent.includes(x);
        });

        if (filtered.length) {
          const list_user_permission = filtered.map((u) => ({
            CREATED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
            CREATED_BY: req.user.username,
            CREATED_IN: "API_WEB_TP",
            MODIFIED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
            MODIFIED_BY: req.user.username,
            MODIFIED_IN: "API_WEB_TP",
            USER_ID: u,
            PERMISSION_ID: permission.ID_PERMISSION,
          }));
          await db.bmauth_user_permissions.bulkCreate(list_user_permission, {
            transaction,
          });
        }
      }

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
