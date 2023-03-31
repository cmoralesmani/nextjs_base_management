// src/api/accounts/index.js

const { Op } = require("sequelize");

import { hasPermissionsTo } from "src/helpers/api";
import { isJsonString } from "src/helpers/api/util";
import { hasPermission } from "src/helpers/utils";
const db = require("@db/models/index");

const accounts_list = async (req, res) => {
  const hasPermissionToListUser = hasPermission(
    await hasPermissionsTo(req.user.username, ["see_users"]),
    "see_users"
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
                db.sequelize.col("NAME_USER"),
                db.sequelize.col("LASTNAME_USER")
              )
            ),
            {
              [Op.substring]: w,
            }
          );
        }),
    };
  if (filters?.sex_user) buildWhere["GENDER_USER_ID"] = filters.sex_user;

  const dataUsersDB = await db.bmauth_user.findAll({
    where: buildWhere,
    include: [
      {
        model: db.bmauth_definition_detail,
        required: true,
        as: "DEF_STATUS_USER",
      },
      {
        model: db.bmauth_definition_detail,
        required: true,
        as: "DEF_GENDER_USER",
      },
    ],
  });

  const dataUsers = JSON.parse(JSON.stringify(dataUsersDB));

  return dataUsers;
};

export default accounts_list;
