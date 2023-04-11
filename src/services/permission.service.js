// src/services/permission.service.js

import { fetchWrapper } from "src/utilities";

const baseUrl = `/api/permission`;

export const permissionService = {
  getPermissions,
};

function getPermissions({ search }) {
  return fetchWrapper.get(`${baseUrl}?search=${search ? search : ""}`);
}
