// pages/api/accounts/index.js

import listUsersCore from "src/api/accounts";
import { apiHandler } from "src/helpers/api";

export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "GET":
      return get();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function get() {
    const dataUsersCoreAsJSON = await listUsersCore(req, res);
    const dataUsers = dataUsersCoreAsJSON.map((p) => ({
      id_user: p.ID_USER,
      username: p.USERNAME,
      name_user: p.NAME_USER,
      lastname_user: p.LASTNAME_USER,
      gender_user_id: p.GENDER_USER_ID,
      de_gender_user: p.DEF_GENDER_USER.DE_DEFINITION_DETAIL,
      status_user_id: p.STATUS_USER_ID,
      de_status_user: p.DEF_STATUS_USER.DE_DEFINITION_DETAIL,
    }));
    return res.status(200).json(dataUsers);
  }
}
