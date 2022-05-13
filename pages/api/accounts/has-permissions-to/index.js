// pages/api/accounts/has-permissions-to/index.js

import { apiHandler, hasPermissionsTo } from "@app/helpers/api";
import { isJsonString } from "@app/helpers/api/util";

export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "GET":
      return get(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function get(req, res) {
    const list_id_permission_str = req.query?.list_id_permission || "{}";
    if (!list_id_permission_str)
      throw "list_id_permission: No especificó la lista de permisos";
    const { isJson, jsonValue: list_id_permission } = isJsonString(
      list_id_permission_str
    );
    if (!isJson) throw "list_id_permission: No especificó un JSON válido";

    if (list_id_permission.length <= 0) {
      throw "No especificó los permisos que desea consultar";
    }

    const permissionResponse = await hasPermissionsTo(
      req.user.username,
      list_id_permission
    );

    return res.status(200).json(permissionResponse);
  }
}