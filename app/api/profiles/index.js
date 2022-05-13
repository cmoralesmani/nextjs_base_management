// app/api/profiles/index.js

const { Op } = require("sequelize");

import { hasPermissionsTo } from "@app/helpers/api";
import { isJsonString } from "@app/helpers/api/util";
import { hasPermission } from "@app/helpers/utils";
const db = require("@db/models/index");

export default async (req, res) => {
  const hasPermissionToListProfile = hasPermission(
    await hasPermissionsTo(req.user.username, ["PERFI-LISTA"]),
    "PERFI-LISTA"
  );
  if (!hasPermissionToListProfile) {
    throw "No tienes permiso para listar perfiles";
  }

  /** Valoraciones a considerar para los filtros especificados en el request */
  const filters_str = req.query?.filters || "{}";
  if (!filters_str) throw "filters: No especificó los filtros";
  const { isJson, jsonValue: filters } = isJsonString(filters_str);
  if (!isJson) throw "filters: No especificó un JSON válido";

  // Obtencion de la lista de perfiles
  let buildWhere = {};
  if (filters?.search)
    buildWhere["DE_PERFIL"] = db.sequelize.where(
      db.sequelize.fn("lower", db.sequelize.col("DE_PERFIL")),
      { [Op.substring]: filters.search.toLowerCase() }
    );

  let dataProfiles = await db.bmauth_perfil.findAll({
    where: buildWhere,
    include: [
      {
        attributes: ["DE_DEFINICION_D"],
        model: db.bmauth_definicion_d,
        required: true,
      },
    ],
  });

  return dataProfiles;
};