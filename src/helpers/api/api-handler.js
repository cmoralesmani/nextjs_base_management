// src/helpers/api/api-handler.js

const pinoHttp = require("pino-http");

import { verifyToken } from "src/api/helpers/auth";
import { errorHandler, jwtMiddleware } from "src/helpers/api";

const logger = require("src/services/logger.service");
const db = require("db/models/index");

export { apiHandler };

function apiHandler(handler) {
  return async (req, res) => {
    try {
      // global middleware
      await jwtMiddleware(req, res);

      // Se establece el objeto user con la informacion del usuario
      // autenticado que ha enviado su token
      req.user = await getUserInTokenRequest(req, res);

      // Middleware para los logs con PINO
      const loggerMidlleware = pinoHttp({
        logger: logger,
        serializers: {
          req(req) {
            req.user = req.raw.user;
            return req;
          },
        },
      });
      loggerMidlleware(req, res);

      if (!(await db.assertDatabaseConnectionOk(req))) {
        throw "No se puede establecer conexión con la base de datos";
      }

      // route handler
      await handler(req, res);
    } catch (err) {
      // global error handler
      errorHandler(err, res);
    }

    async function getUserInTokenRequest(req, res) {
      /*
      Del objeto request que viene en la peticion del cliente
      se obtiene el header authorization y se verifica el token
      para obtener una respuesta con el objeto decodificado.

      Retorna un objeto user equivalente al Token de autenticacion.
      Pero si el request no trae token porque se trata de una ruta
      publica o el token que proveen no es valido entonces retorna
      undefined
      */
      const authHeader = req.headers?.authorization;
      if (!authHeader) {
        return;
      }

      // Ejemplo de authHeader: "Bearer j0194hf19804814"
      // [0]Bearer
      // [1]j0194hf19804814
      const token = authHeader.split(" ")[1];

      const payload = await verifyToken(token, res);
      return payload;
    }
  };
}
