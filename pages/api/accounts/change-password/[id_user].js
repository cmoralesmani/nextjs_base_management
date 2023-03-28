// pages/api/accounts/change-password/[id_user].js

const bcrypt = require("bcryptjs");
import { check, validationResult } from "express-validator";
const moment = require("moment");

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
      check("newPassword")
        .isLength({ min: 5, max: 80 })
        .withMessage("Contraseña no valida (Debe tener mas de 5 caracteres)")
        .custom((password) => {
          const hasNumberVar = hasNumber(password);
          if (!hasNumberVar) {
            throw new Error("La contraseña debe tener al menos un número");
          }

          const hasLetterrVar = hasLetter(password);
          if (!hasLetterrVar) {
            throw new Error("La contraseña debe tener al menos una letra");
          }

          return true;
        }),
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
    const { id_user } = req.query;
    const data = req.body;

    let transaction;
    try {
      transaction = await db.sequelize.transaction();

      let hasPermissionToChancePassworUser = hasPermission(
        await hasPermissionsTo(req.user.username, ["CUEUS-CAMCA"]),
        "CUEUS-CAMCA"
      );
      if (id_user == req.user.id_user) {
        hasPermissionToChancePassworUser = true;
      }
      if (!hasPermissionToChancePassworUser) {
        return res
          .status(403)
          .json({ message: "No tiene permisos para cambiar contraseña" });
      }

      const user = await db.bmauth_usuario.findOne(
        {
          where: { ID_USUARIO: id_user },
        },
        { transaction }
      );
      /* Si no se encuentra el usuario es porque no existe */
      if (!user) {
        throw "El usuario no existe";
      }

      await validateBody(req, res);

      if (id_user == req.user.id_user) {
        await check("oldPassword")
          .trim()
          .isLength({ min: 5 })
          .withMessage("Ingrese su contraseña anterior")
          .custom(async (password) => {
            const isMatch = await bcrypt.compare(password, user.PASSWORD);
            if (!isMatch)
              throw new Error("La contraseña anterior no es correcta");
            return true;
          })
          .run(req);
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      // Se establecen la nueva contrase;a
      user.F_ACTUAL = moment().format("YYYY-MM-DD HH:mm:ss");
      user.USR_ACTUAL = req.user.username;
      user.PROG_ACTUAL = "API_WEB_TP";
      user.PASSWORD = await bcrypt.hashSync(data.newPassword, 10);
      await user.save({ transaction });

      await transaction.commit();
      return res.status(200).json({
        usuario: {
          id_usuario: user.ID_USUARIO,
          username: user.USERNAME,
          nom_usuario: user.NOM_USUARIO,
          ape_usuario: user.APE_USUARIO,
          sex_usuario: user.SEX_USUARIO,
        },
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
