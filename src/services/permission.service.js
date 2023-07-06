import { fetchWrapper } from 'src/utilities'

const baseUrl = '/api/accessibility/permissions'

export const permissionService = {
  getPermissions,
  getById,
  update
}

async function getPermissions ({ filters = {}, options = {} }) {
  return fetchWrapper
    .get(
      `${baseUrl}?filters=${encodeURIComponent(JSON.stringify(filters))}`,
      options
    )
    .then((response) => response.data)
}

async function getById (id, options) {
  return fetchWrapper
    .get(`${baseUrl}/details/${id}`, options)
    .then((response) => response.data)
}

async function update (id, params) {
  return fetchWrapper
    .put(`${baseUrl}/edit/${id}`, params)
    .then((response) => response.data)
}
