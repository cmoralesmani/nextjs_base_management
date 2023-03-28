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
    const dataProfiles = await listProfilesCore(req, res);

    return res.status(200).json({
      perfiles: dataProfiles.map((p) => ({
        id_perfil: p.ID_PERFIL,
        de_perfil: p.DE_PERFIL,
        es_perfil: p.ES_PERFIL,
        de_es_perfil: p.BMAUTH_DEFINICION_D.DE_DEFINICION_D,
      })),
    });
  }
}
