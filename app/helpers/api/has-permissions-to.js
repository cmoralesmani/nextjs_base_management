// app/helpers/api/has-permissions-to.js

const { Op } = require("sequelize");

const logger = require("@app/services/logger.service");
const db = require("@db/models/index");

/**
 * @description
 * Verifica si el usuario pasado por parametro en <<username>>
 * tiene permiso para los Id de Permisos
 * especificados en la lista <<list_id_permission>>.
 * @param {string} username - Nombre de usuario
 * @param {array} list_id_permission - Lista de Id de Permisos
 * @returns {array} - Devuelve una lista objetos con los
 * permisos consultados con un indicador de existencia de permiso.
 * @throws {Error} - Si no se puede consultar la lista de permisos
 * @example
 * hasPermissionsTo("admin", ["CUEUS_LISTA", "CUEUS_CREAR"]);
 * // => [{id_permiso: "CUEUS_LISTA", has_permission: true}, {id_permiso: "CUEUS_CREAR", has_permission: true}]
 */
export async function hasPermissionsTo(username, list_id_permission) {
  if (!Array.isArray(list_id_permission))
    throw "list_id_permission: No especificó una lista válida";

  try {
    if (username && list_id_permission.length > 0) {
      const permitsBD = await db.bmauth_perfil_permiso.findAll({
        attributes: ["ID_PERMISO"],
        include: [
          {
            attributes: [],
            model: db.bmauth_perfil,
            required: true,
            include: [
              {
                attributes: [],
                model: db.bmauth_usuario_perfil,
                required: true,
                include: [
                  {
                    attributes: [],
                    model: db.bmauth_usuario,
                    required: true,
                    where: { USERNAME: username, ES_USUARIO: "ESCUS-ACTIV" },
                  },
                ],
              },
            ],
            where: { ES_PERFIL: "ESPER-ACTIV" },
          },
        ],
        where: { ID_PERMISO: { [Op.in]: list_id_permission } },
      });

      const permitsBDJSON = JSON.parse(JSON.stringify(permitsBD));
      const response = list_id_permission.map((permit) => ({
        id_permiso: permit,
        has_permission: permitsBDJSON.some(
          (permitBD) => permitBD.ID_PERMISO === permit
        ),
      }));
      return response;
    }

    return [];
  } catch (error) {
    logger.error(
      `!hasPermissionsTo Verificando el permiso de un usuario: ${error}`
    );
    return [];
  }
}
