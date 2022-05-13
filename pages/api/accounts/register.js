// pages/api/accounts/register.js

import { check, validationResult } from "express-validator";
const moment = require("moment");
const { v4 } = require("uuid");

import {
  apiHandler,
  hasPermissionsTo,
  initMiddleware,
  validateMiddleware,
} from "@app/helpers/api";
import { hasNumber, hasLetter } from "@app/helpers/api/util";
import { hasPermission } from "@app/helpers/utils";
const db = require("@db/models/index");

const validateBody = initMiddleware(
  validateMiddleware(
    [
      check("username").custom(async (username) => {
        //busca en la base para verificar que el nuevo usuario ingresado no existe
        const user = await db.bmauth_usuario.findOne({
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
      check("nom_usuario")
        .trim()
        .isLength({ min: 3, max: 80 })
        .withMessage("Nombre de usuario invalido longitd minima 3"),
      check("ape_usuario")
        .trim()
        .isLength({ min: 3, max: 80 })
        .withMessage("Apellido invalido longitd minima 3"),
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
    case "POST":
      return post();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function post() {
    const data = req.body;

    const permissions = await hasPermissionsTo(req.user.username, [
      "CUEUS-CREAR",
      "PERFI-LISTA",
    ]);

    //Consulta si el usuario actual tiene permiso para crear un usuario
    const hasPermissionToEditUser = hasPermission(permissions, "CUEUS-CREAR");
    if (!hasPermissionToEditUser) {
      return res.status(403).json({
        message: "No posee los permisos para crear cuentas de usuario",
      });
    }

    const hasPermissionToShowProfiles = hasPermission(
      permissions,
      "PERFI-LISTA"
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
        ID_USUARIO: v4(),
        USERNAME: data.username,
        PASSWORD: data.password,
        NOM_USUARIO: data.nom_usuario,
        APE_USUARIO: data.ape_usuario,
        EMAIL: data.email,
        TEL_CONTACTO: data.tel_contacto,
        SEX_USUARIO: data.sex_usuario,
        ES_USUARIO: data.es_usuario,
      };
      // instruccion para crear un nuevo registro con los datos ingresados
      const dataReceived = await db.bmauth_usuario.create(newData, {
        transaction,
      });

      if (hasPermissionToShowProfiles && data.perfiles_seleccionados?.length) {
        const list_user_profile = data.perfiles_seleccionados.map((p) => ({
          F_CREACION: moment().format("YYYY-MM-DD HH:mm:ss"),
          USR_CREACION: req.user.username,
          PROG_CREACION: "API_WEB_TP",
          F_ACTUAL: moment().format("YYYY-MM-DD HH:mm:ss"),
          USR_ACTUAL: req.user.username,
          PROG_ACTUAL: "API_WEB_TP",
          ID_USUARIO: dataReceived.ID_USUARIO,
          ID_PERFIL: p,
        }));
        await db.bmauth_usuario_perfil.bulkCreate(list_user_profile, {
          transaction,
        });
      }

      await transaction.commit();
      return res.status(200).json({});
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}