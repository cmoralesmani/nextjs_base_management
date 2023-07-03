import getConfig from "next/config";

const expressJwt = require("express-jwt");
const util = require("util");

const { serverRuntimeConfig } = getConfig();
const SECRET_TOKEN = serverRuntimeConfig.SECRET_TOKEN;

export { jwtMiddleware };

function jwtMiddleware(req, res) {
  const middleware = expressJwt
    .expressjwt({
      secret: SECRET_TOKEN,
      algorithms: ["HS256"],
    })
    .unless({
      path: [
        // public routes that don't require authentication
        `/api/accessibility/users/authenticate`,
        `/api/accessibility/users/refresh`,
      ],
    });

  return util.promisify(middleware)(req, res);
}
