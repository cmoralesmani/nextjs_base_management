// pages/api/accounts/details/[id_user].js

import { apiHandler, hasPermissionsTo } from "src/helpers/api";
import { hasPermission } from "src/helpers/utils";

const db = require("@db/models/index");

export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "GET":
      return get();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function get() {
    const { id_user } = req.query;

    if (!id_user) {
      throw "No especificó el usuario que desea ver";
    }

    // Tiene permiso para ver el detalle de usuarios?
    // Si soy el que esta conectado puedo acceder
    if (id_user !== req.user.id_user) {
      const hasPermissionToSeeDetailUser = hasPermission(
        await hasPermissionsTo(req.user.username, ["CUEUS-VER"]),
        "CUEUS-VER"
      );
      if (!hasPermissionToSeeDetailUser) {
        return res.status(403).json({
          message: "No tiene permisos para ver el detalle del usuario",
        });
      }
    }

    // En caso de poseer el permiso retorna los datos del usuarios
    const user = await db.bmauth_usuario.findOne({
      where: { ID_USUARIO: id_user },
      include: [
        {
          model: db.bmauth_usuario_perfil,
          required: false,
          include: [
            {
              model: db.bmauth_perfil,
              required: true,
              where: { ES_PERFIL: "ESPER-ACTIV" },
            },
          ],
        },
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

    /* Check if exists */
    if (!user) {
      throw "El usuario no existe";
    }

    // Obtencion perfiles del usuario consultados
    const objProfiles = user.BMAUTH_USUARIO_PERFILs.map((p) => ({
      id_perfil: p.BMAUTH_PERFIL.ID_PERFIL,
      de_perfil: p.BMAUTH_PERFIL.DE_PERFIL,
    }));

    const userCreate = await db.bmauth_usuario.findOne({
      where: {
        USERNAME: user.USR_CREACION,
      },
      attributes: ["NOM_USUARIO", "APE_USUARIO", "ID_USUARIO"],
    });

    return res.status(200).json({
      id_usuario: user.ID_USUARIO,
      username: user.USERNAME,
      nom_usuario: user.NOM_USUARIO,
      ape_usuario: user.APE_USUARIO,
      email: user.EMAIL,
      tel_contacto: user.TEL_CONTACTO,
      sex_usuario: user.SEX_USUARIO,
      de_sex_usuario: user.DEF_SEX_USUARIO.DE_DEFINICION_D,
      fe_creacion: user.F_CREACION,
      es_usuario: user.ES_USUARIO,
      de_es_usuario: user.DEF_ES_USUARIO.DE_DEFINICION_D,
      perfiles: objProfiles,
      usr_creacion: user.USR_CREACION,
      id_usuario_creacion: userCreate?.ID_USUARIO,
      nom_usuario_creacion: userCreate?.NOM_USUARIO,
      ape_usuario_creacion: userCreate?.APE_USUARIO,
    });
  }
}
