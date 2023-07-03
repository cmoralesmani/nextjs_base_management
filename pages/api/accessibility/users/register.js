import { check, validationResult } from "express-validator";
const moment = require("moment");
const { v4 } = require("uuid");

import {
  apiHandler,
  hasPermissionsTo,
  initMiddleware,
  validateMiddleware,
} from "src/helpers/api";
import { hasNumber, hasLetter } from "src/helpers/api/util";
import { hasPermission } from "src/helpers/utils";

const db = require("@db/models/index");

const validateBody = initMiddleware(
  validateMiddleware(
    [
      check("username").custom(async (username) => {
        //busca en la base para verificar que el nuevo usuario ingresado no existe
        const user = await db.bmauth_user.findOne({
          where: { USERNAME: username },
        });

        if (user) throw new Error("El nombre de usuario ya existe");

        //Permite letras,no permite _ o . en el inicio ni al final , no permine _. y una longitud de 3 a 15
        var validausuario =
          /^(?=.{3,15}$)(?![_.])(?![0-9])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

        if (!validausuario.test(username))
          throw new Error("El nombre de usuario no valido");

        return true;
      }),
      check("password")
        .isLength({ min: 5, max: 80 })
        .withMessage("password invalida longitud minima 5 ")
        .custom((password) => {
          const hasNumberVar = hasNumber(password);
          if (!hasNumberVar) {
            throw new Error("La contraseña debe tener al menos un numero");
          }

          const hasLetterrVar = hasLetter(password);
          if (!hasLetterrVar) {
            throw new Error("La contraseña debe tener al menos una letra");
          }

          return true;
        }),
      check("name_user")
        .trim()
        .isLength({ min: 3, max: 80 })
        .withMessage("Nombre de usuario invalido longitd minima 3"),
      check("lastname_user")
        .trim()
        .isLength({ min: 3, max: 80 })
        .withMessage("Apellido invalido longitd minima 3"),
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
      check("profiles_selected").isArray().withMessage("Perfiles no válidos"),
      check("permissions_selected")
        .isArray()
        .withMessage("Permisos no válidos"),
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
      "create_user",
      "see_profiles",
      "see_permissions",
    ]);

    //Consulta si el usuario actual tiene permiso para crear un usuario
    const hasPermissionToEditUser = hasPermission(permissions, "create_user");
    if (!hasPermissionToEditUser) {
      return res.status(403).json({
        message: "No posee los permisos para crear cuentas de usuario",
      });
    }

    const hasPermissionToShowProfiles = hasPermission(
      permissions,
      "see_profiles"
    );
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
        ID_USER: v4(),
        USERNAME: data.username,
        PASSWORD: data.password,
        NAME_USER: data.name_user,
        LASTNAME_USER: data.lastname_user,
        EMAIL: data.email,
        PHONE_CONTACT: data.phone_contact,
        GENDER_USER_ID: data.gender_user_id,
        STATUS_USER_ID: data.status_user_id,
      };
      // instruccion para crear un nuevo registro con los datos ingresados
      const user = await db.bmauth_user.create(newData, {
        transaction,
      });

      if (hasPermissionToShowProfiles && data.profiles_selected?.length) {
        const list_user_profile = data.profiles_selected.map((p) => ({
          CREATED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
          CREATED_BY: req.user.username,
          CREATED_IN: "API_WEB_TP",
          MODIFIED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
          MODIFIED_BY: req.user.username,
          MODIFIED_IN: "API_WEB_TP",
          USER_ID: user.ID_USER,
          PROFILE_ID: p,
        }));
        await db.bmauth_user_profiles.bulkCreate(list_user_profile, {
          transaction,
        });
      }

      if (
        hasPermissionToShowPermissions &&
        !!data.permissions_selected?.length
      ) {
        const list_user_permission = data.permissions_selected.map((p) => ({
          CREATED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
          CREATED_BY: req.user.username,
          CREATED_IN: "API_WEB_TP",
          MODIFIED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
          MODIFIED_BY: req.user.username,
          MODIFIED_IN: "API_WEB_TP",
          USER_ID: user.ID_USER,
          PERMISSION_ID: p,
        }));
        await db.bmauth_user_permissions.bulkCreate(list_user_permission, {
          transaction,
        });
      }

      await transaction.commit();
      return res.status(200).json({
        id_user: user.ID_USER,
        username: user.USERNAME,
        name_user: user.NAME_USER,
        lastname_user: user.LASTNAME_USER,
        email: user.EMAIL,
        phone_contact: user.PHONE_CONTACT,
        gender_user_id: user.GENDER_USER_ID,
        created_at: user.CREATED_AT,
        status_user_id: user.STATUS_USER_ID,
        created_by: user.CREATED_BY,
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
