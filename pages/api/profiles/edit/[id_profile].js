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
} from "@app/helpers/api";
import { hasPermission } from "@app/helpers/utils";
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
      "PERFI-MODIF",
      "CUEUS-LISTA",
      "PERMI-LISTA",
    ]);
    // Tiene permiso para editar perfiles?
    const hasPermissionToEditProfile = hasPermission(
      hasPermissions,
      "PERFI-MODIF"
    );
    if (!hasPermissionToEditProfile) {
      return res
        .status(403)
        .json({ message: "No tiene permiso para editar perfil" });
    }

    const hasPermissionToShowUsers = hasPermission(
      hasPermissions,
      "CUEUS-LISTA"
    );
    const hasPermissionToShowPermissions = hasPermission(
      hasPermissions,
      "PERMI-LISTA"
    );

    // Verificacion de que haya especificado el usuario que quiere editar
    if (!id_profile) {
      throw "No especificó el perfil que desea editar";
    }

    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const profile = await db.bmauth_perfil.findOne(
        {
          where: { ID_PERFIL: id_profile },
        },
        { transaction }
      );

      /* Verificacion de si existe el perfil que esta tratando de editar */
      if (!profile) {
        throw "El perfil no existe";
      }

      if (profile.ID_PERFIL == "SUADM") {
        throw "El perfil Super Administrador está protegido y no puede ser editado";
      }

      // Validacion de formulario
      await validateBody(req, res);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      // Se establecen los nuevos valores
      (profile.F_ACTUAL = moment().format("YYYY-MM-DD HH:mm:ss")),
        (profile.USR_ACTUAL = req.user.username);
      profile.PROG_ACTUAL = "API_WEB_TP";
      profile.DE_PERFIL = data.de_perfil;
      profile.ES_PERFIL = data.es_perfil;
      await profile.save({ transaction });

      if (hasPermissionToShowUsers) {
        await db.bmauth_usuario_perfil.destroy({
          where: {
            ID_PERFIL: profile.ID_PERFIL,
            ID_USUARIO: {
              [Op.notIn]: data.usuarios_seleccionados,
            },
          },
          transaction,
        });

        const userProfileCurrent = JSON.parse(
          JSON.stringify(
            await db.bmauth_usuario_perfil.findAll(
              {
                attributes: ["ID_USUARIO"],
                where: {
                  ID_PERFIL: profile.ID_PERFIL,
                },
              },
              {
                transaction,
              }
            )
          )
        ).map((x) => {
          return x.ID_USUARIO;
        });

        const filtered = data.usuarios_seleccionados.filter((x) => {
          return !userProfileCurrent.includes(x);
        });

        if (filtered.length) {
          const list_user_profile = filtered.map((u) => ({
            F_CREACION: moment().format("YYYY-MM-DD HH:mm:ss"),
            USR_CREACION: req.user.username,
            PROG_CREACION: "API_WEB_TP",
            F_ACTUAL: moment().format("YYYY-MM-DD HH:mm:ss"),
            USR_ACTUAL: req.user.username,
            PROG_ACTUAL: "API_WEB_TP",
            ID_USUARIO: u,
            ID_PERFIL: profile.ID_PERFIL,
          }));
          await db.bmauth_usuario_perfil.bulkCreate(list_user_profile, {
            transaction,
          });
        }
      }

      if (hasPermissionToShowPermissions) {
        await db.bmauth_perfil_permiso.destroy({
          where: {
            ID_PERFIL: profile.ID_PERFIL,
            ID_PERMISO: {
              [Op.notIn]: data.permisos_seleccionados,
            },
          },
          transaction,
        });

        const profilePermissionCurrent = JSON.parse(
          JSON.stringify(
            await db.bmauth_perfil_permiso.findAll(
              {
                attributes: ["ID_PERMISO"],
                where: {
                  ID_PERFIL: profile.ID_PERFIL,
                },
              },
              {
                transaction,
              }
            )
          )
        ).map((x) => {
          return x.ID_PERMISO;
        });

        const filtered = data.permisos_seleccionados.filter((x) => {
          return !profilePermissionCurrent.includes(x);
        });

        if (filtered.length) {
          const list_profile_permission = filtered.map((p) => ({
            F_CREACION: moment().format("YYYY-MM-DD HH:mm:ss"),
            USR_CREACION: req.user.username,
            PROG_CREACION: "API_WEB_TP",
            F_ACTUAL: moment().format("YYYY-MM-DD HH:mm:ss"),
            USR_ACTUAL: req.user.username,
            PROG_ACTUAL: "API_WEB_TP",
            ID_PERFIL: profile.ID_PERFIL,
            ID_PERMISO: p,
          }));
          await db.bmauth_perfil_permiso.bulkCreate(list_profile_permission, {
            transaction,
          });
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
          id_perfil: profile.ID_PERFIL,
          de_perfil: profile.DE_PERFIL,
          es_perfil: profile.ES_PERFIL,
        },
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}