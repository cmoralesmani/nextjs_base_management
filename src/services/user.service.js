import { fetchWrapper } from 'src/utilities'

const baseUrl = '/api/accessibility/users'

export const userService = {
  getByUsername,
  getById,
  getUsers,
  create,
  update,
  delete: _delete,
  changePassword
}

async function getByUsername (username) {
  return fetchWrapper
    .get(`${baseUrl}/details/by_username/${username}/`)
    .then((response) => response.data)
}

async function getById (id, options) {
  return fetchWrapper
    .get(`${baseUrl}/details/by_id/${id}/`, options)
    .then((response) => response.data)
}

async function getUsers ({ filters = {}, options = {} }) {
  return fetchWrapper
    .get(
      `${baseUrl}?filters=${encodeURIComponent(JSON.stringify(filters))}`,
      options
    )
    .then((response) => response?.data || [])
}

async function create (user) {
  return fetchWrapper
    .post(`${baseUrl}/register`, user)
    .then((response) => response.data)
}

async function update (id, params) {
  return fetchWrapper
    .put(`${baseUrl}/edit/${id}`, params)
    .then((response) => response.data)
}

async function _delete (id) {
  return fetchWrapper
    .delete(`${baseUrl}/delete/${id}`)
    .then((response) => response.data)
}

async function changePassword (id, data) {
  return fetchWrapper
    .post(`${baseUrl}/change-password/${id}`, data)
    .then((response) => response.data)
}
