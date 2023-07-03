const { Op } = require("sequelize");

import { hasPermissionsTo } from "src/helpers/api";
import { isJsonString } from "src/helpers/api/util";
import { hasPermission } from "src/helpers/utils";
const db = require("@db/models/index");

const permissionsList = async (req, res) => {
  const hasPermissionToListPermission = hasPermission(
    await hasPermissionsTo(req.user.username, ["see_permissions"]),
    "see_permissions"
  );
  if (!hasPermissionToListPermission) {
    throw "No tienes permiso para listar los permisos";
  }

  /** Valoraciones a considerar para los filtros especificados en el request */
  const filters_str = req.query?.filters || "{}";
  if (!filters_str) throw "filters: No especificó los filtros";
  const { isJson, jsonValue: filters } = isJsonString(filters_str);
  if (!isJson) throw "filters: No especificó un JSON válido";

  // Obtencion de la lista de permisos
  let buildWhere = {};
  if (filters?.search)
    buildWhere["DE_PERMISSION"] = db.sequelize.where(
      db.sequelize.fn("lower", db.sequelize.col("DE_PERMISSION")),
      { [Op.substring]: filters.search.toLowerCase() }
    );

  const dataPermissions = await db.bmauth_permission.findAll({
    where: buildWhere,
  });

  return dataPermissions;
};

export default permissionsList;
