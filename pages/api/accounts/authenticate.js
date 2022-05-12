// pages/api/accounts/authenticate.js

import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
const jwt = require("jsonwebtoken");
import getConfig from "next/config";

import {
  apiHandler,
  initMiddleware,
  validateMiddleware,
} from "@app/helpers/api";
const db = require("@db/models/index");

const { serverRuntimeConfig } = getConfig();
const KEY = serverRuntimeConfig.JWT_KEY;

const validateBody = initMiddleware(
  validateMiddleware(
    [
      check("username")
        .trim()
        .isLength({ min: 1, max: 30 })
        .withMessage("Nombre de usuario no válido"),
      check("password")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Contraseña no válida"),
    ],
    validationResult
  )
);

export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "POST":
      return authenticate();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function authenticate() {
    try {
      const { username, password } = req.body;

      // Validacion de formulario
      await validateBody(req, res);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const user = await db.bmauth_usuario.findOne({
        where: { USERNAME: username },
      });

      /* Verificacion de la existencia del usuario */
      if (!user) {
        req.log.info(`-authenticate- Usuario no encontrado: ${username}`);
        throw "Usuario no encontrado";
      }

      if (user.ES_USUARIO == "ESCUS-INACT") {
        req.log.info(`-authenticate- El usuario está inactivo: ${username}`);
        throw "El usuario está inactivo";
      }

      /* Define variables */
      const dataUser = user.toJSON();
      const userId = dataUser.ID_USUARIO,
        userUsername = dataUser.USERNAME,
        userFirstName = dataUser.NOM_USUARIO,
        userLastName = dataUser.APE_USUARIO,
        userPassword = dataUser.PASSWORD;

      /* Check and compare password */
      const isMatch = await bcrypt.compare(password, userPassword);

      if (!isMatch) {
        req.log.info(`-authenticate- Contraseña incorrecta: ${userUsername}`);
        throw "Contraseña incorrecta";
      }

      /* Create JWT Payload */
      const payload = {
        id_user: userId,
        username: userUsername,
      };
      /* Sign token */
      const token = jwt.sign(payload, KEY, {
        expiresIn: 31556926, // 1 year in seconds
      });

      req.log.info(`-authenticate- Autenticado correctamente: ${userUsername}`);

      return res.status(200).json({
        id_user: userId,
        username: userUsername,
        first_name: userFirstName,
        last_name: userLastName,
        token,
      });
    } catch (err) {
      req.log.error(`-authenticate- Error: ${err}`);
      throw err;
    }
  }
}