// src/helpers/api/init-middleware.js

// https://dev.to/meddlesome/nextjs-apis-validator-with-middleware-3njl
export { initMiddleware };

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}
