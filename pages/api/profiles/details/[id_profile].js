// pages/api/profiles/details/[id_profile].js

import { apiHandler, hasPermissionsTo } from "@app/helpers/api";
import { hasPermission } from "@app/helpers/utils";
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
    const { id_profile } = req.query;

    if (!id_profile) {
      throw "No especificó el perfil que desea ver";
    }

    // Tiene permiso para ver el detalle de perfil?
    const hasPermissionToSeeDetailProfile = hasPermission(
      await hasPermissionsTo(req.user.username, ["PERFI-VER"]),
      "PERFI-VER"
    );
    if (!hasPermissionToSeeDetailProfile) {
      return res
        .status(403)
        .json({ message: "No tiene permiso para ver detalle de perfil" });
    }

    // Se obtiene el detalle del perfil
    const profile = await db.bmauth_perfil.findOne({
      where: { ID_PERFIL: id_profile },
      include: [
        {
          model: db.bmauth_usuario_perfil,
          required: false,
          include: [
            {
              model: db.bmauth_usuario,
              required: true,
            },
          ],
        },
        {
          model: db.bmauth_definicion_d,
          required: false,
        },
        {
          model: db.bmauth_perfil_permiso,
          required: false,
          include: [
            {
              model: db.bmauth_permiso,
              required: true,
              include: [
                {
                  model: db.bmauth_permiso_grupo,
                  required: true,
                  as: "BMAUTH_A_G",
                },
                {
                  model: db.bmauth_permiso_accion,
                  required: true,
                  as: "BMAUTH_P_A",
                },
              ],
            },
          ],
        },
      ],
    });

    /* Verficacion de si existe el usuario */
    if (!profile) {
      throw "El perfil no existe";
    }

    // Obtencion usuario del perfil consultados
    const objUsers = profile.BMAUTH_USUARIO_PERFILs.map((u) => ({
      id_usuario: u.BMAUTH_USUARIO.ID_USUARIO,
      username: u.BMAUTH_USUARIO.USERNAME,
      nom_usuario: u.BMAUTH_USUARIO.NOM_USUARIO,
      ape_usuario: u.BMAUTH_USUARIO.APE_USUARIO,
    }));

    const objPermissions = profile.BMAUTH_PERFIL_PERMISOs.map((p) => ({
      id_perfil: p.ID_PERFIL,
      id_permiso: p.ID_PERMISO,
      de_permiso: p.BMAUTH_PERMISO.DE_PERMISO,
      id_permiso_grupo: p.BMAUTH_PERMISO.BMAUTH_A_G.ID_PERMISO_GRUPO,
      de_permiso_grupo: p.BMAUTH_PERMISO.BMAUTH_A_G.DE_PERMISO_GRUPO,
      id_permiso_accion: p.BMAUTH_PERMISO.BMAUTH_P_A.ID_PERMISO_ACCION,
      de_permiso_accion: p.BMAUTH_PERMISO.BMAUTH_P_A.DE_PERMISO_ACCION,
    }));
    const objPermissionsSort = objPermissions.sort((a, b) =>
      a.de_permiso > b.de_permiso ? 1 : -1
    );

    return res.status(200).json({
      perfil: {
        id_perfil: profile.ID_PERFIL,
        de_perfil: profile.DE_PERFIL,
        es_perfil: profile.ES_PERFIL,
        de_es_perfil: profile.BMAUTH_DEFINICION_D.DE_DEFINICION_D,
        usuarios: objUsers,
        permisos: objPermissionsSort,
      },
    });
  }
}