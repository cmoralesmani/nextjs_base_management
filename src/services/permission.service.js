import { fetchWrapper } from "src/utilities";

const baseUrl = `/api/accessibility/permissions`;

export const permissionService = {
  getPermissions,
  getById,
};

async function getPermissions({ filters = {}, options = {} }) {
  return fetchWrapper
    .get(
      `${baseUrl}?filters=${encodeURIComponent(JSON.stringify(filters))}`,
      options
    )
    .then((response) => response.data);
}

async function getById(id) {
  return fetchWrapper
    .get(`${baseUrl}/details/${id}`)
    .then((response) => response.data);
}
