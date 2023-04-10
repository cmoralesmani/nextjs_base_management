// pages/api/settings/parameters/index.js

import listParametersCore from "src/api/settings/parameters";
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
    const dataParametersCoreAsJSON = await listParametersCore(req, res);
    const dataParameters = dataParametersCoreAsJSON.map((p) => ({
      id_definicion_m: p.ID_DEFINITION_MASTER,
      de_definicion_m: p.DE_DEFINITION_MASTER,
      cm_definicion: p.COMMENT_DEFINITION,
    }));

    return res.status(200).json(dataParameters);
  }
}
