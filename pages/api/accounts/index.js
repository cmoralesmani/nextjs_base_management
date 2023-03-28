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
    const dataUsers = await listUsersCore(req, res);
    return res.status(200).json({
      users: dataUsers.map((p) => ({
        id_usuario: p.ID_USUARIO,
        username: p.USERNAME,
        nom_usuario: p.NOM_USUARIO,
        ape_usuario: p.APE_USUARIO,
        sex_usuario: p.SEX_USUARIO,
        de_sex_usuario: p.DEF_SEX_USUARIO.DE_DEFINICION_D,
        es_usuario: p.ES_USUARIO,
        de_es_usuario: p.DEF_ES_USUARIO.DE_DEFINICION_D,
      })),
    });
  }
}
