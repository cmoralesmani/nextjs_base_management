// pages/api/accounts/edit/[id_user].js

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
      check("nom_usuario")
        .trim()
        .isLength({ min: 1, max: 80 })
        .withMessage("Nombres no válido"),
      check("ape_usuario")
        .trim()
        .isLength({ min: 1, max: 80 })
        .withMessage("Apellidos no válido"),
      check("email").trim().isEmail().withMessage("Email invalido"),
      check("tel_contacto")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Telefono de contacto no valido"),
      check("sex_usuario")
        .isIn(["SEX-M", "SEX-F"])
        .withMessage("Sexo no válido"),
      check("es_usuario")
        .isIn(["ESCUS-ACTIV", "ESCUS-INACT"])
        .withMessage("Estado no válido"),
      check("perfiles_seleccionados")
        .isArray()
        .withMessage("Perfiles no válidos"),
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
    const { id_user } = req.query;
    const data = req.body;

    const permissions = await hasPermissionsTo(req.user.username, [
      "CUEUS-MODIF",
      "PERFI-LISTA",
    ]);

    const hasPermissionToEditUser = hasPermission(permissions, "CUEUS-MODIF");
    if (id_user !== req.user.id_user) {
      if (!hasPermissionToEditUser) {
        return res
          .status(403)
          .json({ message: "No tiene permisos para editar usuario" });
      }
    }

    const hasPermissionToShowProfiles = hasPermission(
      permissions,
      "PERFI-LISTA"
    );

    // Verificacion de que haya especificado el usuario que quiere editar
    if (!id_user) {
      throw "No especificó el usuario que desea editar";
    }

    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const user = await db.bmauth_usuario.findOne(
        {
          where: { ID_USUARIO: id_user },
        },
        { transaction }
      );

      /* Verificacion de si existe el usuario que esta tratando de editar */
      if (!user) {
        throw "El usuario no existe";
      }

      // Validacion de formulario
      await validateBody(req, res);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      // Se establecen los nuevos valoresedi
      (user.F_ACTUAL = moment().format("YYYY-MM-DD HH:mm:ss")),
        (user.USR_ACTUAL = req.user.username);
      user.PROG_ACTUAL = "API_WEB_TP";
      user.NOM_USUARIO = data.nom_usuario;
      user.APE_USUARIO = data.ape_usuario;
      user.EMAIL = data.email;
      user.TEL_CONTACTO = data.tel_contacto;
      user.SEX_USUARIO = data.sex_usuario;

      if (hasPermissionToEditUser) {
        user.ES_USUARIO = data.es_usuario;
      }
      await user.save({ transaction });

      if (hasPermissionToEditUser) {
        if (hasPermissionToShowProfiles) {
          await db.bmauth_usuario_perfil.destroy({
            where: {
              ID_USUARIO: user.ID_USUARIO,
              ID_PERFIL: {
                [Op.notIn]: data.perfiles_seleccionados,
              },
            },
            transaction,
          });

          const upCurrent = JSON.parse(
            JSON.stringify(
              await db.bmauth_usuario_perfil.findAll(
                {
                  attributes: ["ID_PERFIL"],
                  where: {
                    ID_USUARIO: user.ID_USUARIO,
                  },
                },
                { transaction }
              )
            )
          ).map((x) => {
            return x.ID_PERFIL;
          });

          const filtered = data.perfiles_seleccionados.filter((x) => {
            return !upCurrent.includes(x);
          });

          if (filtered.length) {
            const list_user_profile = filtered.map((p) => ({
              F_CREACION: moment().format("YYYY-MM-DD HH:mm:ss"),
              USR_CREACION: req.user.username,
              PROG_CREACION: "API_WEB_TP",
              F_ACTUAL: moment().format("YYYY-MM-DD HH:mm:ss"),
              USR_ACTUAL: req.user.username,
              PROG_ACTUAL: "API_WEB_TP",
              ID_USUARIO: user.ID_USUARIO,
              ID_PERFIL: p,
            }));
            await db.bmauth_usuario_perfil.bulkCreate(list_user_profile, {
              transaction,
            });
          }
        }
      }

      // Antes de hacer commit por la operacion realizada se verifica si queda algun administrador
      const there_is_any_admin = await thereIsAnyAdmin(transaction);
      if (!there_is_any_admin) {
        throw "La operación que desea realizar deja al perfil de Super Administrador sin ningún usuario asignado";
      }

      await transaction.commit();
      return res.status(200).json({});
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
