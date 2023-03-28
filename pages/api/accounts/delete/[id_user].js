// pages/api/accounts/delete/[id_user].js

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
    const { id_user } = req.query;

    // Tiene permiso para eliminar usuarios?
    const hasPermissionToDeleteUser = hasPermission(
      await hasPermissionsTo(req.user.username, ["CUEUS-ELIMI"]),
      "CUEUS-ELIMI"
    );
    if (!hasPermissionToDeleteUser) {
      return res
        .status(403)
        .json({ message: "No tiene permisos para eliminar usuarios" });
    }

    // Verificacion de que haya especificado el usuario que quiere eliminar
    if (!id_user) {
      throw "No especificó el usuario que desea eliminar";
    }

    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const user = await db.bmauth_usuario.findOne(
        {
          where: { ID_USUARIO: id_user },
        },
        { transaction }
      );

      /* Verificacion de si existe el perfil que esta tratando de eliminar */
      if (!user) {
        throw "El usuario no existe";
      }

      await user.destroy({ transaction });

      // Antes de hacer commit por la operacion realizada se verifica si queda algun administrador
      const there_is_any_admin = await thereIsAnyAdmin(transaction);
      if (!there_is_any_admin) {
        throw "La operación que desea realizar deja al perfil de Super Administrador sin ningún usuario asignado";
      }

      await transaction.commit();
      return res.status(200).json({});
    } catch (error) {
      await transaction.rollback();
      throw "No se pudo eliminar el usuario (No debe estar asignado a algun perfil)";
    }
  }
}
