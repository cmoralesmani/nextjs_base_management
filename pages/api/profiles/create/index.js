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
          const profile = await db.bmauth_perfil.findOne({
            where: { ID_PERFIL: id_perfil },
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
      "PERFI-CREAR",
      "CUEUS-LISTA",
      "PERMI-LISTA",
    ]);
    const hasPermissionToCreateProfile = hasPermission(
      permissions,
      "PERFI-CREAR"
    );
    if (!hasPermissionToCreateProfile) {
      return res
        .status(403)
        .json({ message: "No tiene permiso para crear perfil" });
    }

    const hasPermissionToShowUsers = hasPermission(permissions, "CUEUS-LISTA");
    const hasPermissionToShowPermissions = hasPermission(
      permissions,
      "PERMI-LISTA"
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
        F_CREACION: moment().format("YYYY-MM-DD HH:mm:ss"),
        USR_CREACION: req.user.username,
        PROG_CREACION: "API_WEB_TP",
        F_ACTUAL: moment().format("YYYY-MM-DD HH:mm:ss"),
        USR_ACTUAL: req.user.username,
        PROG_ACTUAL: "API_WEB_TP",
        ID_PERFIL: data.id_perfil,
        DE_PERFIL: data.de_perfil,
        ES_PERFIL: data.es_perfil,
      };
      // instruccion para crear un nuevo registro con los datos ingresados
      const dataReceived = await db.bmauth_perfil.create(newData, {
        transaction,
      });

      if (hasPermissionToShowUsers) {
        if (data.usuarios_seleccionados?.length) {
          const list_users_permission = data.usuarios_seleccionados.map(
            (p) => ({
              F_CREACION: moment().format("YYYY-MM-DD HH:mm:ss"),
              USR_CREACION: req.user.username,
              PROG_CREACION: "API_WEB_TP",
              F_ACTUAL: moment().format("YYYY-MM-DD HH:mm:ss"),
              USR_ACTUAL: req.user.username,
              PROG_ACTUAL: "API_WEB_TP",
              ID_USUARIO: p,
              ID_PERFIL: dataReceived.ID_PERFIL,
            })
          );
          await db.bmauth_usuario_perfil.bulkCreate(list_users_permission, {
            transaction,
          });
        }
      }

      if (hasPermissionToShowPermissions) {
        if (data.permisos_seleccionados?.length) {
          const list_profile_permission = data.permisos_seleccionados.map(
            (p) => ({
              F_CREACION: moment().format("YYYY-MM-DD HH:mm:ss"),
              USR_CREACION: req.user.username,
              PROG_CREACION: "API_WEB_TP",
              F_ACTUAL: moment().format("YYYY-MM-DD HH:mm:ss"),
              USR_ACTUAL: req.user.username,
              PROG_ACTUAL: "API_WEB_TP",
              ID_PERFIL: dataReceived.ID_PERFIL,
              ID_PERMISO: p,
            })
          );
          await db.bmauth_perfil_permiso.bulkCreate(list_profile_permission, {
            transaction,
          });
        }
      }

      await transaction.commit();
      return res.status(200).json({
        perfil: {
          id_perfil: dataReceived.ID_PERFIL,
          de_perfil: dataReceived.de_perfil,
        },
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
