// pages/api/profiles/edit/[id_profile].js

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
      check("de_perfil")
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage("Nombre no válido"),
      check("es_perfil")
        .isIn(["ESPER-ACTIV", "ESPER-INACT"])
        .withMessage("Estado no válido"),
      check("usuarios_seleccionados")
        .isArray()
        .withMessage("Usuarios no válidos"),
      check("permisos_seleccionados")
        .isArray()
        .withMessage("Permisos no válidos"),
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
    const { id_profile } = req.query;
    const data = req.body;

    const hasPermissions = await hasPermissionsTo(req.user.username, [
      "alter_profile",
      "see_users",
      "see_permissions",
    ]);
    // Tiene permiso para editar perfiles?
    const hasPermissionToEditProfile = hasPermission(
      hasPermissions,
      "alter_profile"
    );
    if (!hasPermissionToEditProfile) {
      return res
        .status(403)
        .json({ message: "No tiene permiso para editar perfil" });
    }

    const hasPermissionToShowUsers = hasPermission(hasPermissions, "see_users");
    const hasPermissionToShowPermissions = hasPermission(
      hasPermissions,
      "see_permissions"
    );

    // Verificacion de que haya especificado el usuario que quiere editar
    if (!id_profile) {
      throw "No especificó el perfil que desea editar";
    }

    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const profile = await db.bmauth_profile.findOne(
        {
          where: { ID_PROFILE: id_profile },
        },
        { transaction }
      );

      /* Verificacion de si existe el perfil que esta tratando de editar */
      if (!profile) {
        throw "El perfil no existe";
      }

      if (profile.ID_PROFILE == "SUADM") {
        throw "El perfil Super Administrador está protegido y no puede ser editado";
      }

      // Validacion de formulario
      await validateBody(req, res);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      // Se establecen los nuevos valores
      (profile.MODIFIED_AT = moment().format("YYYY-MM-DD HH:mm:ss")),
        (profile.MODIFIED_BY = req.user.username);
      profile.MODIFIED_IN = "API_WEB_TP";
      profile.DE_PROFILE = data.de_perfil;
      profile.STATUS_PROFILE_ID = data.es_perfil;
      await profile.save({ transaction });

      if (hasPermissionToShowUsers) {
        await db.bmauth_user_profiles.destroy({
          where: {
            ID_PROFILE: profile.ID_PROFILE,
            ID_USER: {
              [Op.notIn]: data.usuarios_seleccionados,
            },
          },
          transaction,
        });

        const userProfileCurrent = JSON.parse(
          JSON.stringify(
            await db.bmauth_user_profiles.findAll(
              {
                attributes: ["ID_USER"],
                where: {
                  ID_PROFILE: profile.ID_PROFILE,
                },
              },
              {
                transaction,
              }
            )
          )
        ).map((x) => {
          return x.ID_USER;
        });

        const filtered = data.usuarios_seleccionados.filter((x) => {
          return !userProfileCurrent.includes(x);
        });

        if (filtered.length) {
          const list_user_profile = filtered.map((u) => ({
            CREATED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
            CREATED_BY: req.user.username,
            CREATED_IN: "API_WEB_TP",
            MODIFIED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
            MODIFIED_BY: req.user.username,
            MODIFIED_IN: "API_WEB_TP",
            ID_USER: u,
            ID_PROFILE: profile.ID_PROFILE,
          }));
          await db.bmauth_user_profiles.bulkCreate(list_user_profile, {
            transaction,
          });
        }
      }

      if (hasPermissionToShowPermissions) {
        await db.bmauth_profile_permissions.destroy({
          where: {
            ID_PROFILE: profile.ID_PROFILE,
            ID_PERMISSION: {
              [Op.notIn]: data.permisos_seleccionados,
            },
          },
          transaction,
        });

        const profilePermissionCurrent = JSON.parse(
          JSON.stringify(
            await db.bmauth_profile_permissions.findAll(
              {
                attributes: ["ID_PERMISSION"],
                where: {
                  ID_PROFILE: profile.ID_PROFILE,
                },
              },
              {
                transaction,
              }
            )
          )
        ).map((x) => {
          return x.ID_PERMISSION;
        });

        const filtered = data.permisos_seleccionados.filter((x) => {
          return !profilePermissionCurrent.includes(x);
        });

        if (filtered.length) {
          const list_profile_permission = filtered.map((p) => ({
            CREATED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
            CREATED_BY: req.user.username,
            CREATED_IN: "API_WEB_TP",
            MODIFIED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
            MODIFIED_BY: req.user.username,
            MODIFIED_IN: "API_WEB_TP",
            ID_PROFILE: profile.ID_PROFILE,
            ID_PERMISSION: p,
          }));
          await db.bmauth_profile_permissions.bulkCreate(
            list_profile_permission,
            {
              transaction,
            }
          );
        }
      }

      // Antes de hacer commit por la operacion realizada se verifica si queda algun administrador
      const there_is_any_admin = await thereIsAnyAdmin(transaction);
      if (!there_is_any_admin) {
        throw "La operación que desea realizar deja al perfil de Super Administrador sin ningún usuario asignado";
      }

      await transaction.commit();
      return res.status(200).json({
        perfil: {
          id_perfil: profile.ID_PROFILE,
          de_perfil: profile.DE_PROFILE,
          es_perfil: profile.STATUS_PROFILE_ID,
        },
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
