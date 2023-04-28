// src/services/user.service.js

import { fetchWrapper } from "src/utilities";

const baseUrl = `/api/accounts`;

export const userService = {
  getUserByUsername,
  getUserById,
  getUsers,
  register,
  update,
  delete: _delete,
  changePassword,
};

function getUserByUsername(username) {
  return fetchWrapper
    .get(`${baseUrl}/details/by_username/${username}/`)
    .then((response) => response.data);
}

function getUserById(id_user) {
  return fetchWrapper
    .get(`${baseUrl}/details/by_id/${id_user}/`)
    .then((response) => response.data);
}

function getUsers(filters = {}) {
  return fetchWrapper
    .get(`${baseUrl}?filters=${encodeURIComponent(JSON.stringify(filters))}`)
    .then((response) => response.data);
}

function register(user) {
  return fetchWrapper
    .post(`${baseUrl}/register`, user)
    .then((response) => response.data);
}

function update(id_user, params) {
  return fetchWrapper
    .put(`${baseUrl}/edit/${id_user}`, params)
    .then((response) => response.data);
}

function _delete(id_user) {
  return fetchWrapper
    .delete(`${baseUrl}/delete/${id_user}`)
    .then((response) => response.data);
}

function changePassword(data) {
  return fetchWrapper
    .post(`${baseUrl}/change-password/${data.id_user}`, data)
    .then((response) => response.data);
}
