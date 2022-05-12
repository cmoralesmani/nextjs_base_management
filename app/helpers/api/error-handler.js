// app/helpers/api/error-handler.js

const logger = require("@app/services/logger.service");

export { errorHandler };

function errorHandler(err, res) {
  logger.error(err);

  if (typeof err === "string") {
    // Error personalizado en la aplicacion
    // se lanza con un throw "Mensaje personalizado"
    return res.status(400).json({ message: err });
  }

  if (err.name === "UnauthorizedError") {
    // El jwt authentication lanzo error
    return res.status(401).json({ message: "Token no valido" });
  }

  // Por defecto se deja la respuesta 500 que es un error de servidor
  return res.status(500).json({ message: err.message });
}
