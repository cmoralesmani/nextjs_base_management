// pages/api/settings/parameters/index.js

import listParametersCore from "@app/api/settings/parameters";
import { apiHandler } from "@app/helpers/api";

export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "GET":
      return get();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function get() {
    const dataParameters = await listParametersCore(req, res);

    return res.status(200).json({
      parametros: dataParameters.map((p) => ({
        id_definicion_m: p.ID_DEFINICION_M,
        de_definicion_m: p.DE_DEFINICION_M,
        cm_definicion: p.CM_DEFINICION,
      })),
    });
  }
}
