import { fetchWrapper } from "src/utilities";

const baseUrl = `/api/maintenance/parameters`;

export const parametersService = {
  getById,
  getParameters,
  update,
};

async function getById(id, options) {
  return fetchWrapper
    .get(`${baseUrl}/details/${id}`, options)
    .then((response) => response.data);
}

async function getParameters({ filters = {}, options = {} }) {
  return fetchWrapper
    .get(
      `${baseUrl}?filters=${encodeURIComponent(JSON.stringify(filters))}`,
      options
    )
    .then((response) => response?.data || []);
}

async function update(id, params) {
  return fetchWrapper
    .put(`${baseUrl}/edit/${id}`, params)
    .then((response) => response.data);
}
