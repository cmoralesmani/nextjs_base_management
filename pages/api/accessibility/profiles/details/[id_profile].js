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
    const { id_profile } = req.query;

    if (!id_profile) {
      throw "No especificó el perfil que desea ver";
    }

    // Tiene permiso para ver el detalle de perfil?
    const hasPermissionToSeeDetailProfile = hasPermission(
      await hasPermissionsTo(req.user.username, ["see_single_profile"]),
      "see_single_profile"
    );
    if (!hasPermissionToSeeDetailProfile) {
      return res
        .status(403)
        .json({ message: "No tiene permiso para ver detalle de perfil" });
    }

    // Se obtiene el detalle del perfil
    const profile = await db.bmauth_profile.findOne({
      where: { ID_PROFILE: id_profile },
      include: [
        {
          model: db.bmauth_user_profiles,
          required: false,
          include: [
            {
              model: db.bmauth_user,
              required: true,
            },
          ],
        },
        {
          model: db.bmauth_definition_detail,
          required: false,
        },
        {
          model: db.bmauth_profile_permissions,
          required: false,
          include: [
            {
              model: db.bmauth_permission,
              required: true,
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
    const usersOfProfile = profile.BMAUTH_USER_PROFILEs.map((u) => ({
      id_user: u.BMAUTH_USER.ID_USER,
      username: u.BMAUTH_USER.USERNAME,
      name_user: u.BMAUTH_USER.NAME_USER,
      lastname_user: u.BMAUTH_USER.LASTNAME_USER,
    }));
    const usersSelected = usersOfProfile.map((u) => u.id_user);
    const permissionsOfProfile = profile.BMAUTH_PROFILE_PERMISSIONs.map(
      (p) => ({
        id_profile: p.PROFILE_ID,
        id_permission: p.PERMISSION_ID,
        de_permission: p.BMAUTH_PERMISSION.DE_PERMISSION,
      })
    );
    const permissionsOfProfileSort = permissionsOfProfile.sort((a, b) =>
      a.de_permission > b.de_permission ? 1 : -1
    );

    const permissionsSelected = permissionsOfProfileSort.map(
      (p) => p.id_permission
    );

    return res.status(200).json({
      id_profile: profile.ID_PROFILE,
      de_profile: profile.DE_PROFILE,
      status_profile_id: profile.STATUS_PROFILE_ID,
      de_status_profile: profile.BMAUTH_DEFINITION_DETAIL.DE_DEFINITION_DETAIL,
      users: usersOfProfile,
      users_selected: usersSelected,
      permissions: permissionsOfProfileSort,
      permissions_selected: permissionsSelected,
    });
  }
}
