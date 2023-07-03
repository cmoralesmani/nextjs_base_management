const { Op } = require("sequelize");

import { hasPermissionsTo } from "src/helpers/api";
import { isJsonString } from "src/helpers/api/util";
import { hasPermission } from "src/helpers/utils";
const db = require("@db/models/index");

const parametersList = async (req, res) => {
  const hasPermissionToListParameters = hasPermission(
    await hasPermissionsTo(req.user.username, ["see_parameters"]),
    "see_parameters"
  );
  if (!hasPermissionToListParameters) {
    return res
      .status(403)
      .json({ message: "No posee los permisos para listar parametros" });
  }

  /** Valoraciones a considerar para los filtros especificados en el request */
  const filters_str = req.query?.filters || "{}";
  if (!filters_str) throw "filters: No especificó los filtros";
  const { isJson, jsonValue: filters } = isJsonString(filters_str);
  if (!isJson) throw "filters: No especificó un JSON válido";

  const buildWhere = {};
  if (filters?.search)
    buildWhere["DE_DEFINITION_MASTER"] = db.sequelize.where(
      db.sequelize.fn("lower", db.sequelize.col("DE_DEFINITION_MASTER")),
      { [Op.substring]: filters?.search.toLowerCase() }
    );

  const dataParameters = await db.bmauth_definition_master.findAll({
    where: buildWhere,
    order: [["DE_DEFINITION_MASTER", "ASC"]],
  });

  return dataParameters;
};

export default parametersList;
