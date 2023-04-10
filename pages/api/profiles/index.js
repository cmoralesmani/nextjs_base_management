// pages/api/profiles/index.js

import listProfilesCore from "src/api/profiles";
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
    const dataProfilesCoreAsJSON = await listProfilesCore(req, res);
    const dataProfiles = dataProfilesCoreAsJSON.map((p) => ({
      id_perfil: p.ID_PROFILE,
      de_perfil: p.DE_PROFILE,
      es_perfil: p.STATUS_PROFILE_ID,
      de_es_perfil: p.BMAUTH_DEFINITION_DETAIL.DE_DEFINITION_DETAIL,
    }));

    return res.status(200).json(dataProfiles);
  }
}
