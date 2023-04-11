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
  return fetchWrapper.get(`${baseUrl}/details/by_username/${username}/`);
}

function getUserById(id_user) {
  return fetchWrapper.get(`${baseUrl}/details/by_id/${id_user}/`);
}

function getUsers(filters = {}) {
  return fetchWrapper.get(
    `${baseUrl}?filters=${encodeURIComponent(JSON.stringify(filters))}`
  );
}

function register(user) {
  return fetchWrapper.post(`${baseUrl}/register`, user);
}

function update(id_user, params) {
  return fetchWrapper.put(`${baseUrl}/edit/${id_user}`, params);
}

function _delete(id_user) {
  return fetchWrapper.delete(`${baseUrl}/delete/${id_user}`);
}

function changePassword(data) {
  return fetchWrapper.post(`${baseUrl}/change-password/${data.id_user}`, data);
}
