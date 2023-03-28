// pages/api/profiles/delete/[id_profile].js

import { apiHandler, hasPermissionsTo, thereIsAnyAdmin } from "src/helpers/api";
import { hasPermission } from "src/helpers/utils";
const db = require("@db/models/index");

export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      return _delete();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function _delete() {
    const { id_profile } = req.query;

    // Tiene permiso para eliminar perfiles?
    const hasPermissionToDeleteProfile = hasPermission(
      await hasPermissionsTo(req.user.username, ["PERFI-ELIMI"]),
      "PERFI-ELIMI"
    );
    if (!hasPermissionToDeleteProfile) {
      return res
        .status(403)
        .json({ message: "No tiene permiso para eliminar" });
    }

    // Verificacion de que haya especificado el perfil que quiere eliminar
    if (!id_profile) {
      throw "No especificó el perfil que desea eliminar";
    }

    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const profile = await db.bmauth_perfil.findOne(
        {
          where: { ID_PERFIL: id_profile },
        },
        { transaction }
      );

      /* Verificacion de si existe el perfil que esta tratando de eliminar */
      if (!profile) {
        throw "El perfil no existe";
      }

      await profile.destroy({ transaction });

      // Antes de hacer commit por la operacion realizada se verifica si queda algun administrador
      const there_is_any_admin = await thereIsAnyAdmin(transaction);
      if (!there_is_any_admin) {
        throw "La operación que desea realizar deja al perfil de Super Administrador sin ningún usuario asignado";
      }

      await transaction.commit();
      return res.status(200).json({});
    } catch (error) {
      await transaction.rollback();
      throw "No se pudo eliminar el perfil (No debe tener usuarios y permisos asignados)";
    }
  }
}
