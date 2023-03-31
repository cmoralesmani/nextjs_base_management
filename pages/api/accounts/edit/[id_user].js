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
} from "src/helpers/api";
import { hasPermission } from "src/helpers/utils";
const db = require("@db/models/index");

const validateBody = initMiddleware(
  validateMiddleware(
    [
      check("name_user")
        .trim()
        .isLength({ min: 1, max: 80 })
        .withMessage("Nombres no válido"),
      check("lastname_user")
        .trim()
        .isLength({ min: 1, max: 80 })
        .withMessage("Apellidos no válido"),
      check("email").trim().isEmail().withMessage("Email invalido"),
      check("phone_contact")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Telefono de contacto no valido"),
      check("gender_user_id")
        .isIn(["SEX-M", "SEX-F"])
        .withMessage("Sexo no válido"),
      check("status_user_id")
        .isIn(["ESCUS-ACTIV", "ESCUS-INACT"])
        .withMessage("Estado no válido"),
      check("profiles_seleccionados")
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
      "alter_user",
      "see_profiles",
    ]);

    const hasPermissionToEditUser = hasPermission(permissions, "alter_user");
    if (id_user !== req.user.id_user) {
      if (!hasPermissionToEditUser) {
        return res
          .status(403)
          .json({ message: "No tiene permisos para editar usuario" });
      }
    }

    const hasPermissionToShowProfiles = hasPermission(
      permissions,
      "see_profiles"
    );

    // Verificacion de que haya especificado el usuario que quiere editar
    if (!id_user) {
      throw "No especificó el usuario que desea editar";
    }

    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const user = await db.bmauth_user.findOne(
        {
          where: { ID_USER: id_user },
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
      (user.MODIFIED_AT = moment().format("YYYY-MM-DD HH:mm:ss")),
        (user.MODIFIED_BY = req.user.username);
      user.MODIFIED_IN = "API_WEB_TP";
      user.NAME_USER = data.name_user;
      user.LASTNAME_USER = data.lastname_user;
      user.EMAIL = data.email;
      user.PHONE_CONTACT = data.phone_contact;
      user.GENDER_USER_ID = data.gender_user_id;

      if (hasPermissionToEditUser) {
        user.STATUS_USER = data.status_user_id;
      }
      await user.save({ transaction });

      if (hasPermissionToEditUser) {
        if (hasPermissionToShowProfiles) {
          await db.bmauth_user_profiles.destroy({
            where: {
              ID_USER: user.ID_USER,
              ID_PROFILE: {
                [Op.notIn]: data.profiles_seleccionados,
              },
            },
            transaction,
          });

          const upCurrent = JSON.parse(
            JSON.stringify(
              await db.bmauth_user_profiles.findAll(
                {
                  attributes: ["ID_PROFILE"],
                  where: {
                    ID_USER: user.ID_USER,
                  },
                },
                { transaction }
              )
            )
          ).map((x) => {
            return x.ID_PROFILE;
          });

          const filtered = data.profiles_seleccionados.filter((x) => {
            return !upCurrent.includes(x);
          });

          if (filtered.length) {
            const list_user_profile = filtered.map((p) => ({
              CREATED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
              CREATED_BY: req.user.username,
              CREATED_IN: "API_WEB_TP",
              MODIFIED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
              MODIFIED_BY: req.user.username,
              MODIFIED_IN: "API_WEB_TP",
              ID_USER: user.ID_USER,
              ID_PROFILE: p,
            }));
            await db.bmauth_user_profiles.bulkCreate(list_user_profile, {
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
