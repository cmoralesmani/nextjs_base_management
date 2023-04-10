// src/api/profiles/index.js

const { Op } = require("sequelize");

import { hasPermissionsTo } from "src/helpers/api";
import { isJsonString } from "src/helpers/api/util";
import { hasPermission } from "src/helpers/utils";
const db = require("@db/models/index");

const profilesAsJSON = async (req, res) => {
  const hasPermissionToListProfile = hasPermission(
    await hasPermissionsTo(req.user.username, ["see_profiles"]),
    "see_profiles"
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
    buildWhere["DE_PROFILE"] = db.sequelize.where(
      db.sequelize.fn("lower", db.sequelize.col("DE_PROFILE")),
      { [Op.substring]: filters.search.toLowerCase() }
    );

  let dataProfiles = await db.bmauth_profile.findAll({
    where: buildWhere,
    include: [
      {
        attributes: ["DE_DEFINITION_DETAIL"],
        model: db.bmauth_definition_detail,
        required: true,
      },
    ],
  });

  return dataProfiles;
};

export default profilesAsJSON;
