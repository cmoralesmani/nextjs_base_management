// app/api/settings/parameters/index.js

const { Op } = require("sequelize");

import { hasPermissionsTo } from "@app/helpers/api";
import { isJsonString } from "@app/helpers/api/util";
import { hasPermission } from "@app/helpers/utils";
const db = require("@db/models/index");

export default async (req, res) => {
  const hasPermissionToListParameters = hasPermission(
    await hasPermissionsTo(req.user.username, ["PARAM-LISTA"]),
    "PARAM-LISTA"
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
    buildWhere["DE_DEFINICION_M"] = db.sequelize.where(
      db.sequelize.fn("lower", db.sequelize.col("DE_DEFINICION_M")),
      { [Op.substring]: filters?.search.toLowerCase() }
    );

  const dataParameters = await db.bmauth_definicion_m.findAll({
    where: buildWhere,
    order: [["DE_DEFINICION_M", "ASC"]],
  });

  return dataParameters;
};