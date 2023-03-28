// src/api/accounts/index.js

const { Op } = require("sequelize");

import { hasPermissionsTo } from "src/helpers/api";
import { isJsonString } from "src/helpers/api/util";
import { hasPermission } from "src/helpers/utils";
const db = require("@db/models/index");

export default async (req, res) => {
  const hasPermissionToListUser = hasPermission(
    await hasPermissionsTo(req.user.username, ["CUEUS-LISTA"]),
    "CUEUS-LISTA"
  );
  if (!hasPermissionToListUser) {
    return res
      .status(403)
      .json({ message: "No posee los permisos para listar usuarios" });
  }

  /** Valoraciones a considerar para los filtros especificados en el request */
  const filters_str = req.query?.filters || "{}";
  if (!filters_str) throw "filters: No especificó los filtros";
  const { isJson, jsonValue: filters } = isJsonString(filters_str);
  if (!isJson) throw "filters: No especificó un JSON válido";

  // Obtencion de la lista de usuarios
  let buildWhere = {};
  if (filters?.search)
    buildWhere["USERNAME"] = {
      [Op.and]: filters?.search
        .toLowerCase()
        .split(" ")
        .map((w) => {
          return db.sequelize.where(
            db.sequelize.fn(
              "lower",
              db.sequelize.fn(
                "concat",
                db.sequelize.col("USERNAME"),
                db.sequelize.col("NOM_USUARIO"),
                db.sequelize.col("APE_USUARIO")
              )
            ),
            {
              [Op.substring]: w,
            }
          );
        }),
    };
  if (filters?.sex_user) buildWhere["SEX_USUARIO"] = filters.sex_user;

  const dataUsersDB = await db.bmauth_usuario.findAll({
    where: buildWhere,
    include: [
      {
        model: db.bmauth_definicion_d,
        required: true,
        as: "DEF_ES_USUARIO",
      },
      {
        model: db.bmauth_definicion_d,
        required: true,
        as: "DEF_SEX_USUARIO",
      },
    ],
  });

  const dataUsers = JSON.parse(JSON.stringify(dataUsersDB));

  return dataUsers;
};
