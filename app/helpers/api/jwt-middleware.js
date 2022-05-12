// app/helpers/api/jwt-middleware.js

const expressJwt = require("express-jwt");
import getConfig from "next/config";
const util = require("util");

const { serverRuntimeConfig } = getConfig();
const SECRET_KEY = serverRuntimeConfig.JWT_KEY;

export { jwtMiddleware };

function jwtMiddleware(req, res) {
  const middleware = expressJwt
    .expressjwt({
      secret: SECRET_KEY,
      algorithms: ["HS256"],
    })
    .unless({
      path: [
        // public routes that don't require authentication
        `/api/accounts/authenticate`,
      ],
    });

  return util.promisify(middleware)(req, res);
}