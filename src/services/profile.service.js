import { fetchWrapper } from "src/utilities";

const baseUrl = `/api/accessibility/profiles`;

export const profileService = {
  getProfileById,
  getProfiles,
  create,
  update,
  delete: _delete,
};

async function getProfileById(id, options) {
  return fetchWrapper
    .get(`${baseUrl}/details/${id}`, options)
    .then((response) => response.data);
}

async function getProfiles({ filters = {}, options = {} }) {
  return fetchWrapper
    .get(
      `${baseUrl}?filters=${encodeURIComponent(JSON.stringify(filters))}`,
      options
    )
    .then((response) => response?.data || []);
}

async function create(profile) {
  return fetchWrapper
    .post(`${baseUrl}/create`, profile)
    .then((response) => response.data);
}

async function update(id, params) {
  return fetchWrapper
    .put(`${baseUrl}/edit/${id}`, params)
    .then((response) => response.data);
}

async function _delete(id) {
  return fetchWrapper
    .delete(`${baseUrl}/delete/${id}`)
    .then((response) => response.data);
}
